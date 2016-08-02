import { mixin } from '../utils'

import Base from './base'
import SizeMixin from '../mixins/size'

export default class Size extends mixin(Base, SizeMixin) {

  constructor (w = 0, h = 0) {
    super()
    if (w instanceof Size) {
      this._w = w.w
      this._h = w.h
    }
    else {
      this._w = w
      this._h = h
    }
  }

}

Size.constructor.prototype.fromArray = a => { return new Size(a[0], a[1]) }
