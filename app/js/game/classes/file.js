import { mixin } from '../../utils'

import Base from '../../classes/base'

import Drive from './drive'
import HardDrive from './hard-drive'
import Diskette from './diskette'
import User from './user'

import Name from '../mixins/name'
import Size from '../mixins/size'
import Random from '../mixins/random'

export default class File extends mixin(Base, Name, Size, Random) {

  constructor (drive, parent, name, size, rights) {
    super()
    let [_name, _type] = (name || '').toUpperCase().split('.')
    this.initName((_name || '').substr(0, 12))
    this.initSize(size || 0)
    this.define('drive', { type: Drive, linked: true, default: drive })
    this.define('parent', { type: File, linked: true, default: parent })
    this.define('type', { type: String, default: _type || '' })
    this.define('rights', { type: String, default: rights || '' })
    this.define('access', { type: [User], linked: true, singular: 'user' })
    this.define('entries', { type: [File], singular: 'entry', searchField: 'filename', default: this.isFolder ? [] : null })
  }

  get computer () { return this.drive.owner }

  get isRoot () { return this.parent instanceof HardDrive || this.parent instanceof Diskette }
  get isFile () { return !this.isFolder }
  get isFolder () { return this.type === 'DIR' || this.isRoot }

  get pathname () { return _.template('{{parent}}.{{filename}}', { parent: parent.pathname, filename: this.filename }) }
  get filename () { return _.template('{{name}}.{{type}}', { name: this.name, type: this.type }) }

  get size () { return this.isFile ? this._size : _.reduce(this.entries, (accum, e) => accum + e.size) }

  hasRight (right) { return right in this.rights }
  hasAccess (user) { return this.users.length === 0 || this.findUser(user) !== null }

  canRead (user) { return this.hasRight('r') && this.hasAccess(user) }
  canWrite (user) { return this.hasRight('w') && this.hasAccess(user) }

  allowRights (rights) {
    let rr = this.rights
    for (let r of rights.toLowerCase()) {
      if (!this.hasRight(r)) {
        rr += r
      }
    }
    this.rights = rr
    return this
  }

  revokeRights (rights) {
    let rr = this.rights
    for (let r of rights.toLowerCase()) {
      if (!this.hasRight(r)) {
        rr = rr.replace(r, '')
      }
    }
    this.rights = rr
    return this
  }

  entry (name) { return this.isFolder ? _.find(this.entries, e => e.filename === name.toUpperCase()) : null }

  exists (name) { return !_.isUndefined(this.entry(name)) }

  mkDir (name) {
    if (this.isFolder && name) {
      let e = this.entry(name)
      if (!e) {
        e = new File(this, name, true)
        this.push('entries', e)
        this.emit('folder.create', e)
      }
    }
    return this
  }

  create (name) {
    let e = null
    if (this.isFolder && name) {
      e = this.entry(name)
      if (!e) {
        e = new File(this, name)
        this.addEntry(e)
        this.emit('file.create', e)
      }
    }
    return e
  }

  delete (name) {
    if (this.isFolder) {
      let e = this.entry(name)
      if (e) {
        let n = e.filename
        this.removeEntry(e)
        this.emit('file.delete', n)
      }
    }
    else {
      this.parent.delete(this.filename)
    }
    return this
  }

  read (name) {
    if (this.isFolder) {
      let e = this.entry(name)
      if (e) {
        return e
      }
    }
    return this
  }

  write (name, size) {
    if (_.isNumber(name)) {
      size = name
      name = undefined
    }
    if (this.isFolder && name) {
      let e = this.entry(name)
      if (!e) {
        e = this.create(name)
      }
      if (e) {
        e.write(size)
      }
    }
    else if (this.isFile) {
      this.size = size
    }
    return this
  }

}
