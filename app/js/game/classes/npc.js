import { mixin, moment } from '../../utils'

import Base from '../../classes/base'

import Icon from '../mixins/icon'
import Missions from '../mixins/missions'
import Equipments from '../mixins/equipments'
import Inventory from '../mixins/inventory'
import Random from '../mixins/random'

// import User from './user'
// import Company from './company'
// import Computer from './computer'

export default class Npc extends mixin(Base, Icon, Missions, Equipments, Inventory, Random) {

  constructor (gender, firstName, lastName, birthday, company, user, computer) {
    super()
    this.define('gender', { type: String, default: gender || this.random.gender() })
    this.define('firstName', { type: String, default: firstName || this.random.firstName(this.gender) })
    this.define('lastName', { type: String, default: lastName || this.random.lastName(this.gender) })
    this.define('birthday', { type: moment, default: birthday || this.random.birthday() })
    // this.define('company', { type: Company, linked: true, default: company })
    // this.define('computer', { type: Computer, default: computer || new Computer(this) })
    // this.define('user', { type: User, linked: true, default: user })
  }

  get fullName () { return this.firstName + ' ' + this.lastName }

  get age () { return moment().diff(this.birthday, 'years') }

  get email () { return this.firstName + '.' + this.lastName + '@' + this.domain }

}
