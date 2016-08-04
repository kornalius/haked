import { mixin_extend } from '../utils'
import BaseMixin from '../mixins/base'
import StoreMixin from '../mixins/store'

export default class Base {

  constructor () {
    this.initStore()
    this.initBase()
  }

}

mixin_extend(Base.prototype, BaseMixin)
mixin_extend(Base.prototype, StoreMixin)
