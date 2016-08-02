import { mixin } from '../../utils'

import Hardware from './hardware'

import Spd from '../mixins/spd'

export default class Cpu extends mixin(Hardware, Spd) {

  constructor (owner, spd) {
    super(owner)
    this._spd = spd || 1
  }

}
