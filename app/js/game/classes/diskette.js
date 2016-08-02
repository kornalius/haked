import Hardware from './hardware'

import File from './file'
import DiskDrive from './disk-drive'

export default class Diskette extends Hardware {

  constructor (owner, drive) {
    super(owner)
    this.define('drive', { type: DiskDrive, linked: true, default: drive })
    this.define('root', { type: File, default: new File(this, '/', true) })
  }

}
