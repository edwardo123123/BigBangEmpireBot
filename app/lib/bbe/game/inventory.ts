import DataObject from './utils/dataObject';

export type inventoryRaw = {
  id: number,
  character_id: number,
  head_item_id: number,
  chest_item_id: number,
  belt_item_id: number,
  legs_item_id: number,
  boots_item_id: number,
  necklace_item_id: number,
  ring_item_id: number,
  piercing_item_id: number,
  gadget_item_id: number,
  missiles_item_id: number,
  bag_item1_id: number,
  bag_item2_id: number,
  bag_item3_id: number,
  bag_item4_id: number,
  bag_item5_id: number,
  bag_item6_id: number,
  bag_item7_id: number,
  bag_item8_id: number,
  bag_item9_id: number,
  bag_item10_id: number,
  bag_item11_id: number,
  bag_item12_id: number,
  bag_item13_id: number,
  bag_item14_id: number,
  bag_item15_id: number,
  bag_item16_id: number,
  bag_item17_id: number,
  bag_item18_id: number,
  shop_item1_id: number,
  shop_item2_id: number,
  shop_item3_id: number,
  shop_item4_id: number,
  shop_item5_id: number,
  shop_item6_id: number,
  shop_item7_id: number,
  shop_item8_id: number,
  shop_item9_id: number,
  item_set_data: string,
};

export default class Inventory extends DataObject<inventoryRaw> {
  id: number;

  characterId: number;

  headItemId: number;
  chestItemId: number;
  beltItemId: number;
  legsItemId: number;
  bootsItemId: number;
  necklaceItemId: number;
  ringItemId: number;
  piercingItemId: number;
  gadgetItemId: number;
  missilesItemId: number;

  bagItem1Id: number;
  bagItem2Id: number;
  bagItem3Id: number;
  bagItem4Id: number;
  bagItem5Id: number;
  bagItem6Id: number;
  bagItem7Id: number;
  bagItem8Id: number;
  bagItem9Id: number;
  bagItem10Id: number;
  bagItem11Id: number;
  bagItem12Id: number;
  bagItem13Id: number;
  bagItem14Id: number;
  bagItem15Id: number;
  bagItem16Id: number;
  bagItem17Id: number;
  bagItem18Id: number;

  shopItem1Id: number;
  shopItem2Id: number;
  shopItem3Id: number;
  shopItem4Id: number;
  shopItem5Id: number;
  shopItem6Id: number;
  shopItem7Id: number;
  shopItem8Id: number;
  shopItem9Id: number;

  itemSetData: string;
}