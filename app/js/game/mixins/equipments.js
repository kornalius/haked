import Item from '../classes/item'

export default {

  init () {
    this.define('equipments', { type: [Item], linked: true, singular: 'equipment', searchField: 'name' })
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
