import { mixin } from '../../utils'

import Base from '../../classes/base'

import Company from './company'
import Server from './server'
import Npc from './npc'
import Player from './player'

import Day from '../mixins/day'
import Time from '../mixins/time'

import Connect from './commands/connect'
import Copy from './commands/copy'
import Delete from './commands/delete'
import Disconnect from './commands/disconnect'
import Echo from './commands/echo'
import Eject from './commands/eject'
import Insert from './commands/insert'
import Install from './commands/install'
import Login from './commands/login'
import Logout from './commands/logout'
import Move from './commands/move'
import Send from './commands/send'
import Uninstall from './commands/uninstall'
import View from './commands/view'


export default class Game extends mixin(Base, Day, Time) {

  constructor () {
    super()
    this.initDay()
    this.initTime()
    this.define('companies', { type: [Company], singular: 'company', searchField: 'name' })
    this.define('npcs', { type: [Npc], singular: 'npc', searchField: 'fullName' })
    this.define('servers', { type: [Server], singular: 'server', searchField: 'fullName' })
    this.define('player', { type: Player })

    this._commands = {
      connect: new Connect(),
      copy: new Copy(),
      delete: new Delete(),
      disconnect: new Disconnect(),
      echo: new Echo(),
      eject: new Eject(),
      insert: new Insert(),
      install: new Install(),
      login: new Login(),
      logout: new Logout(),
      move: new Move(),
      send: new Send(),
      uninstall: new Uninstall(),
      view: new View(),
    }
  }

}
