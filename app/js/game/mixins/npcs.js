import Npc from '../classes/npc'

export default {

  init () {
    this.define('npcs', { type: [Npc], singular: 'npc', searchField: 'fullName' })
  },

}
