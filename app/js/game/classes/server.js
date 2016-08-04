import { mixin } from '../../utils'

import Computer from './computer'

import Icon from '../mixins/icon'
import Random from '../mixins/random'
import Ip from '../mixins/ip'
import Users from '../mixins/users'

export default class Server extends mixin(Computer, Icon, Random, Ip, Users) {

  constructor (owner, icon, ip) {
    super(owner)
    this.initIcon(icon)
    this.initIp(ip || this.randomIp())
    this.initUsers()
  }

  get domain () { return this.owner.domain }

}
