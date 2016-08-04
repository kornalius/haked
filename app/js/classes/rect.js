import { mixin } from '../utils'

import Base from './base'
import RectMixin from '../mixins/rect'

export default class Rect extends mixin(Base, RectMixin) {

  constructor (x, y, w, h) {
    super()
    this.initRect()
  }

}

Rect.constructor.prototype.fromArray = a => { return new Rect(a[0], a[1], a[2], a[3]) }
