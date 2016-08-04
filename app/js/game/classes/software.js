import { now } from '../../utils'

import File from './file'

const _NONE = 0
const _RUNNING = 1
const _PAUSED = 2
const _STOPPED = 3

export default class Software extends File {

  constructor (drive, parent, name, size, rights, version, spd) {
    super(drive, parent, name, size, rights)
    this.define('version', { type: String, default: version || '1.0' })
    this.define('spd', { type: Number, default: spd || 1 })
    this.define('state', { type: Number })
    this.define('pid', { type: Number })
    this.define('elapsed', { type: Number })
  }

  canExec (user) { return this.hasRight('x') && this.hasAccess(user) }

  get isLoaded () { return this.state !== _NONE }
  get isRunning () { return this.state === _RUNNING }
  get isPaused () { return this.state === _PAUSED }
  get isStopped () { return this.state === _STOPPED }

  load () {
    if (!this.isLoaded) {
      this.computer.ram.alloc(this.size)
      this.state = _STOPPED
      this.run()
    }
  }

  unload () {
    if (this.isLoaded) {
      this.computer.ram.free(this.size)
      this.state = _NONE
    }
  }

  run () {
    this.load()
    this.state = _RUNNING
    this.elapsed = 0
    this._lastTick = now()
    this.tick()
  }

  pause () {
    if (this.isRunning) {
      this.state = _PAUSED
    }
  }

  resume () {
    if (this.isPaused) {
      this.state = _RUNNING
      this._lastTick = now()
      this.tick()
    }
  }

  kill () {
    this.state = _STOPPED
    this.unload()
  }

  tick () {
    if (this.isRunning && this.computer.cpu.canAlloc(this.spd)) {
      this.computer.cpu.alloc(this.spd)
      let n = now()
      let elapsed = n - this._lastTick
      this._lastTick = n
      this.elapsed += elapsed
    }
  }

  exec (source, target, qty) {
    this.run()
    return this
  }

}
