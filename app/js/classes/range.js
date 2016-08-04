import { mixin } from '../utils'

import Base from './base'
import RangeMixin from '../mixins/range'

export default class Range extends mixin(Base, RangeMixin) {

  constructor (start, end) {
    super()
    this.initRange(start, end)
  }

}

Range.constructor.prototype.fromArray = a => { return new Range(a[0], a[1]) }
