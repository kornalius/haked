import { mixin } from '../../utils'

import Base from '../../classes/base'

import Name from '../mixins/name'

export default class Command extends mixin(Base, Name) {

  constructor () {
    super()
    this.initName(this.constructor.name.toLowerCase())
  }

  exec (source, target, qty) {
    return null
  }

}
