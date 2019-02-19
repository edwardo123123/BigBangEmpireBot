import game from '../models/game';

import AbstractModule from '.';

import { itemType } from '../models/types/item';

export default class InventoryModule extends AbstractModule {
  private refreshShop: boolean = true;
  private notifiedItems: number[] = [];
  private oldStatPointAvailable: number = 0;

  async handle(): Promise<void> {
    await this.handleInventoryAdvanced();
    await this.handleInventoryShop();
    await this.handleRefreshShop();
    await this.handleStatPointAvailable();
  }

  get inventory() {
    return game.inventory;
  }

  get hasRefreshedShopToday() {
    return game.character.hasRefreshedShopToday;
  }

  get statPointsAvailable() {
    return game.character.statPointsAvailable;
  }

  private async handleInventoryAdvanced() {
    let modified;

    do {
      modified = false;

      // @ts-ignore
      await Promise.serial(this.inventory.bagItemsId.map((bagItemId) => {
        if (modified) {
          return;
        }

        const item = game.getItem(bagItemId);
        if (!item) {
          return;
        }

        const equippedItemId = this.inventory.getItemBySlot(item.type);

        if (!equippedItemId) {
          if (item.isUsable) {
            return this.request.useInventoryItem(item);
          }

          this.log.verbose(`Moving item: ${item.slot} (empty slot)`);

          modified = true;

          return this.request.moveInventoryItem(item.id, item.type);
        }

        const equippedItem = game.getItem(equippedItemId);

        if (equippedItem && item.statTotal <= equippedItem.statTotal) {
          if (item.type === itemType.MISSILES) {
            return;
          }

          this.log.verbose(`Selling item: ${item.slot}\n- my: ${equippedItem.statTotal}\n- bag: ${item.statTotal}`);

          return this.request.sellInventoryItem(item.id);
        }

        if (!item.battleSkill && !equippedItem.battleSkill) {
          this.log.verbose(`Moving item: ${item.slot} (better item)`);

          modified = true;

          return this.request.moveInventoryItem(item.id, item.type);
        }

        this.log.verbose(`New item: ${item.slot}\n- my: ${equippedItem.statTotal}\n- bag: ${item.statTotal}`);
      }));
    } while (modified);
  }

  private async handleInventoryShop() {
    await Promise.all(this.inventory.shopItemsId.map(async (shopItemId) => {
      if (!shopItemId) {
        return;
      }

      const item = game.getItem(shopItemId);
      const equippedItemId = this.inventory.getItemBySlot(item.slot);
      const equippedItem = equippedItemId && game.getItem(equippedItemId);

      const isUnequipped = !equippedItem;
      const isBetter = equippedItem && item.statTotal > equippedItem.statTotal;
      const isMissiles = item.type === itemType.MISSILES;

      if (isUnequipped || isBetter || isMissiles) {
        const messages = [];
        messages.push(`- ${item.slot}`);
        messages.push(`- ${item.buyPrice} ${item.premiumItem ? 'diamonds' : 'coins'}`);

        if (isUnequipped) {
          messages.push('- You don\'t have this slot equipped');
        }

        if (isBetter) {
          messages.push(`- It's ${item.statTotal - equippedItem.statTotal} points better`);
        }

        if (isMissiles) {
          messages.push('- It\'s missiles');
        }

        if (item.premiumItem) {
          if (this.notifiedItems.includes(item.id)) {
            return;
          }

          this.notifiedItems.push(item.id);

          return this.bot.askForItemPurchase(item, messages, game.inventory);
        }

        this.log.info(['You are buying an item:', ...messages].join('\n'));

        return this.request.buyShopItem(item, game.inventory.firstAvailableSlot);
      }
    }));

    this.refreshShop = true;
  }

  private async handleRefreshShop() {
    if (!this.hasRefreshedShopToday && this.refreshShop) {
      this.log.info('Refreshing shop');

      await this.request.refreshShopItems();
    }
  }

  private handleStatPointAvailable() {
    if (!this.statPointsAvailable) {
      return;
    }

    if (this.oldStatPointAvailable !== this.statPointsAvailable) {
      this.log.verbose(`You have stat points available: ${this.statPointsAvailable}`);
    }

    this.oldStatPointAvailable = this.statPointsAvailable;
  }
}