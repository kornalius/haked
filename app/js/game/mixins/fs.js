import { mixin_extend } from '../../utils'

import File from '../classes/file'

import Root from './root'

export default mixin_extend({}, Root, {

  initFs (root = null) {
    this.initRoot(root)
    this.define('cwd', { type: File, linked: true, default: root })
  },

  get isRoot () { return this._cwd === this.root },

  cd (name) {
    if (name === '/') {
      this.cwd = this.root
    }
    else if (name === '..') {
      this.cwd = this.cwd.parent || this.root
    }
    else {
      let e = this.cwd.entry(name)
      if (e && e.isFolder) {
        this.cwd = e
      }
    }
    return this
  },

  exists (name) { return this.cwd.exists(name) },

  entry (name) { return this.cwd.entry(name) },

  isFile (name) { return this.cwd.isFile(name) },

  isFolder (name) { return this.cwd.isFolder(name) },

  mkDir (name) { return this.cwd.mkDir(name) },

  create (name) { return this.cwd.create(name) },

  delete (name) { return this.cwd.delete(name) },

  read (name) { return this.cwd.read(name) },

  write (name, content) { return this.cwd.write(name) },

}
