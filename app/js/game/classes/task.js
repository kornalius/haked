import { mixin } from '../../utils'

import Base from '../../classes/base'

import Action from '../mixins/action'
import Source from '../mixins/source'
import Target from '../mixins/target'
import Script from '../mixins/script'
import Qty from '../mixins/qty'

export default class Task extends mixin(Base, Action, Source, Target, Qty, Script) {

  constructor (action, source, target, qty, script) {
    super()
    this.initAction(action)
    this.initSource(source)
    this.initTarget(target)
    this.initQty(qty)
    this.initScript(script)
  }

}
