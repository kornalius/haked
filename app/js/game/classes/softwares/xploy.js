import Software from './software'

export default class XPloy extends Software {

  constructor (drive, parent) {
    super(drive, parent, 'XPLOY.EXE', 28, 'rx', '1.0', 50)
  }

  tick () {
    super.tick()
    if (this.isRunning) {

    }
  }

}
