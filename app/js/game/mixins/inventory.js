import Item from '../classes/item'

export default {

  init () {
    this.define('inventory', { type: [Item], singular: 'inventory', searchField: 'name' })
  },

}
