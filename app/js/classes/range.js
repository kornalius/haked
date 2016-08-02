import { mixin } from '../utils'

import Base from './base'
import RangeMixin from '../mixins/range'

export default class Range extends mixin(Base, RangeMixin) {

  constructor (start, end) {
    super()
    if (start instanceof Range) {
      this._start = start.start
      this._end = start.end
    }
    else {
      this._start = start
      this._end = end
    }
  }

}

Range.constructor.prototype.fromArray = a => { return new Range(a[0], a[1]) }
