import { mixin } from '../../utils'

import Base from '../../classes/base'
import Command from '../mixins/command'
import Source from '../mixins/source'
import Target from '../mixins/target'
import Qty from '../mixins/qty'
import Script from '../mixins/script'

export default class Action extends mixin(Base, Command, Source, Target, Qty, Script) {

  constructor (command, source, target, qty, script) {
    super()
    this.initCommand(command)
    this.initSource(source)
    this.initTarget(target)
    this.initQty(qty)
    this.initScript(script)
  }

  exec () {
    let r = null
    if (this.command) {
      r = this.command.exec(this.source, this.target, this.qty)
    }
    if (this.script) {
      r = this.script.exec(this.source, this.target, this.qty)
    }
    return r
  }

}
