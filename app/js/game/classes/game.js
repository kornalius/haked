import { mixin } from '../../utils'

import Base from '../../classes/base'

import Company from './company'
import Server from './server'
import Npc from './npc'
import Player from './player'

import Day from '../mixins/day'
import Time from '../mixins/time'

export default class Game extends mixin(Base, Day, Time) {

  constructor () {
    super()
    this.define('companies', { type: [Company], singular: 'company', searchField: 'name' })
    this.define('npcs', { type: [Npc], singular: 'npc', searchField: 'fullName' })
    this.define('servers', { type: [Server], singular: 'server', searchField: 'fullName' })
    this.define('player', { type: Player })
  }

}
