import { mixin } from '../utils'

import Base from './base'
import RectMixin from '../mixins/rect'

export default class Rect extends mixin(Base, RectMixin) {

  constructor (x, y, w, h) {
    super()
    if (x instanceof Rect) {
      this._x = x.x
      this._y = x.y
      this._w = x.w
      this._h = x.h
    }
    else {
      this._x = x
      this._y = y
      this._w = w
      this._h = h
    }
  }

}

Rect.constructor.prototype.fromArray = a => { return new Rect(a[0], a[1], a[2], a[3]) }
