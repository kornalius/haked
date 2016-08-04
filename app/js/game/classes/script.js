import { _ } from '../../utils'

import Base from '../../classes/base'

export default class Script extends Base {

  constructor (code) {
    super()
    this.define('code', { type: String, default: code })
    this._opcodes = null
  }

  set code (value) {
    super(value)
    this._opcodes = null
  }

  error (msg) {
    console.error(msg)
  }

  parse () {
    if (!this._opcodes) {
      this._opcodes = []
    }

    let lineNo = 0
    for (let line of this.code.split('\n')) {
      let op = {}
      lineNo++
      for (let token of line.split(' ')) {
        let q = _.parseInt(token)
        if (!op.cmd) {
          op.cmd = _.find(window._app.store._commands, { name: token.toLowerCase() })
          if (!op.cmd) {
            this.error(_.template('Syntax Error at "{{token}}" on line #{{lineNo}}', { token, lineNo }))
            return null
          }
        }
        else if (!op.qty && !q.isNaN()) {
          op.qty = q
        }
        else if (q.isNaN()) {
          if (!op.source) {
            op.source = token
          }
          else if (!op.target) {
            op.target = token
          }
        }
      }
      this._opcodes.push(op)
    }
    return this._opcodes
  }

  get compiled () { return this._opcodes }

  exec (source, target, qty) {
    if (!this.compiled) {
      this.parse()
    }
    let r = null
    for (let op of this._opcodes) {
      r = op.cmd.exec(op.source, op.target, op.qty)
    }
    return r
  }

}
