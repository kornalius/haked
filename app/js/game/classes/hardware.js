import { mixin } from '../../utils'

import Item from './item'

import Spd from '../mixins/spd'
import Size from '../mixins/size'

export default class Hardware extends mixin(Item, Spd, Size) {

  constructor (owner, spd, size) {
    super(owner)
    this._spd = spd || 0
    this._size = size || 0
  }

}
