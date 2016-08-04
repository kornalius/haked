import Item from '../classes/item'

export default {

  initInventory (inventory = []) {
    this.define('inventory', { type: [Item], singular: 'inventory', searchField: 'name', default: inventory })
  },

}
