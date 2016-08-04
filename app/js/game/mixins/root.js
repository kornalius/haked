import File from '../classes/file'

export default {

  initRoot (owner = null, root = null) {
    this.define('root', { type: File, default: root || new File(owner, this, '/') })
  },

}
