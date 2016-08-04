import Item from '../classes/item'

export default {

  initEquipments (equipments = []) {
    this.define('equipments', { type: [Item], linked: true, singular: 'equipment', searchField: 'name', default: equipments })
  },

  isEquipped (item) {

  },

  canEquip (item) {

  },

  equip (item) {

  },

  canUnequip (item) {

  },

  unequip (item) {

  },

}
