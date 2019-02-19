import { camelCase } from 'lodash';

import { itemQuality } from '../types/common';
import { itemType } from '../types/item';

import DataObject from '../utils/dataObject';

export type itemRaw = {
  id: number;
  character_id: number;
  identifier: string;
  type: itemType;
  quality: itemQuality;
  required_level: number;
  charges: number;
  item_level: number;
  ts_availability_start: number;
  ts_availability_end: number;
  premium_item: boolean;
  buy_price: number;
  sell_price: number;
  stat_stamina: number;
  stat_strength: number;
  stat_critical_rating: number;
  stat_dodge_rating: number;
  stat_weapon_damage: number;
  display_options: number;
  battle_skill: string;
};

export default class Item extends DataObject<itemRaw> {
  id: number;
  characterId: number;
  identifier: string;
  type: itemType;
  quality: itemQuality;
  requiredLevel: number;
  charges: number;
  itemLevel: number;
  tsAvailabilityStart: number;
  tsAvailabilityEnd: number;
  premiumItem: boolean;
  buyPrice: number;
  sellPrice: number;
  statStamina: number;
  statStrength: number;
  statCriticalRating: number;
  statDodgeRating: number;
  statWeaponDamage: number;
  displayOptions: number;
  battleSkill: string;

  static USABLE_TYPES = [
    itemType.SURPRISE_BOX,
    itemType.SHOP_TITLE,
    itemType.RESKILL,
    itemType.WEDDING_RING,
    itemType.DIVORCE_ITEM,
  ];

  static OUTFIT_DISPLAY_OPTIONS = [7, 8];

  get isUsable() {
    return Item.USABLE_TYPES.includes(this.type);
  }

  get isPremium() {
    return !!this.premiumItem;
  }

  get isOutfitItem() {
    return Item.OUTFIT_DISPLAY_OPTIONS.includes(this.displayOptions);
  }

  get isMarriageRewardItem() {
    return this.identifier === 'ring_wedding_ring';
  }

  get missileDamage() {
    return 0;
  }

  get statTotal() {
    return this.statStamina + this.statStrength + this.statCriticalRating + this.statDodgeRating + this.statWeaponDamage + this.missileDamage;
  }

  get slot() {
    return camelCase(itemType[this.type]);
  }

  get qualityName() {
    return camelCase(itemQuality[this.quality]);
  }
}