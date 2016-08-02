import Base from '../../classes/base'

import Game from './game'

export default class App extends Base {

  constructor () {
    super()
    window._app = this
    this.store = new Game()
    window._rootStore = this.store
    window._rootIndex[this.store.id] = this.store
  }

}
