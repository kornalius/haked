import { mixin } from '../../utils'

import Hardware from './hardware'

import Spd from './spd'

export default class Modem extends mixin(Hardware, Spd) {

  constructor (owner, spd) {
    super(owner)
    this.initSpd(spd || 1)
  }

}
