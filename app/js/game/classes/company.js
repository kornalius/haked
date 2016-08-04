import { mixin } from '../../utils'

import Base from '../../classes/base'

import Server from './server'
import Npc from './npc'

import Name from '../mixins/name'
import Random from '../mixins/random'

export default class Company extends mixin(Base, Name, Random) {

  constructor (name) {
    super()
    this.initName(name || this.random.companyName())
    this.define('domainSuffix', { type: String, default: this.random.domainSuffix().toLowerCase() })
    this.define('server', { type: Server, default: new Server(this) })
    this.define('employees', { type: [Npc], linked: true, singular: 'employee', searchField: 'fullName' })
  }

  get domain () { return this.name.toLowerCase() + '.' + this.domainSuffix }

}
