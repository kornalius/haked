import Mission from '../classes/mission'

export default {

  init () {
    this.define('missions', { type: [Mission], singular: 'mission', searchField: 'name' })
  },

}
