import File from './file'

export default class Software extends File {

  constructor (parent, name, date, size, rights, version, ram, cpu) {
    super(parent, name, date, size, rights)
    this.define('version', { type: String, default: version || '0.0.1' })
    this.define('ram', { type: Number, default: ram || 0 })
    this.define('cpu', { type: Number, default: cpu || 0 })
    this.define('state', { type: Number })
    this.define('pid', { type: Number })
  }

  get canExec () { return this.hasRight('x') }

  exec () {
    return this
  }

}
