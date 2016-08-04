import { mixin } from '../utils'

import Base from './base'
import SizeMixin from '../mixins/size'

export default class Size extends mixin(Base, SizeMixin) {

  constructor (w = 0, h = 0) {
    super()
    this.initSize(w, h)
  }

}

Size.constructor.prototype.fromArray = a => { return new Size(a[0], a[1]) }
