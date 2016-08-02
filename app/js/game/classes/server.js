import { mixin } from '../../utils'

import Computer from './computer'
import User from './user'

import Icon from '../mixins/icon'
import Random from '../mixins/random'

export default class Server extends mixin(Computer, Icon, Random) {

  constructor (owner, ip) {
    super(owner)
    this.define('ip', { type: String, default: ip || this.random.ip() })
    this.define('users', { type: [User], singular: 'user', searchField: 'username' })
  }

  get domain () { return this.owner.domain }

  findUser (n) {
    let u = null

    let users = this.users

    if (n instanceof User) {
      u = n.username
    }

    if (!u && _.isString(n)) {
      for (let uu of users) {
        if (uu.username === n) {
          u = uu
          break
        }
      }
    }

    return u
  }

  addUser (username, password) {
    let u = this.findUser(username)
    if (!u) {
      if (username instanceof User) {
        u = username
        u.server = this
      }
      else {
        u = new User(this, username, password)
      }
      this.push('users', u)
    }
    return this
  }

  removeUser (n) {
    let u = this.findUser(n)
    if (u) {
      this.pull('users', u)
    }
    return this
  }

}
