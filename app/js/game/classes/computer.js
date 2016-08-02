import { _ } from '../../utils'

import Hardware from './hardware'
import Cpu from './cpu'
import Ram from './ram'
import DiskDrive from './disk-drive'
import HardDrive from './hard-drive'
import Modem from './modem'

export default class Computer extends Hardware {

  constructor (owner, cpuSpd, ramSize, modemSpd, hdSize) {
    super(owner)
    this.define('cpu', { type: Cpu, default: new Cpu(cpuSpd || 1) })
    this.define('ram', { type: Ram, default: new Ram(ramSize || 64) })
    this.define('diskA', { type: DiskDrive, default: new DiskDrive() })
    this.define('diskB', { type: DiskDrive, default: null })
    this.define('hd', { type: HardDrive, default: hdSize > 0 ? new HardDrive(hdSize) : null })
    this.define('modem', { type: Modem, default: new Modem(modemSpd || 300) })
  }

  get hasDiskB () { return !_.isNull(this.diskB) }
  get hasHD () { return !_.isNull(this.hd) }

}
