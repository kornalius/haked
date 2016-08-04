import Mission from '../classes/mission'

export default {

  initMissions (missions = []) {
    this.define('missions', { type: [Mission], singular: 'mission', searchField: 'name', default: missions })
  },

}
