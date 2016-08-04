import Npc from '../classes/npc'

export default {

  initNpcs (npcs = []) {
    this.define('npcs', { type: [Npc], singular: 'npc', searchField: 'fullName', default: npcs })
  },

}
