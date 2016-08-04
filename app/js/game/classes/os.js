import Software from './software'

export default class OS extends Software {

  constructor (drive, parent, name, size, version, spd) {
    super(drive, parent, name, size, 'rx', version, spd)
    this.define('processes', { type: [Software], linked: true, singular: 'process' })
  }

  tick () {
    this.computer.tick().then(() => {
      this.computer.cpu.alloc(this.spd)
      for (let p of this.processes) {
        p.tick()
      }
    }).then(() => this.tick())
  }

}
