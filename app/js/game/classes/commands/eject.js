import Command from '../command'
import DiskDrive from '../diskdrive'

export default class Eject extends Command {

  exec (source) {
    let r = super(source)
    if (source instanceof DiskDrive) {
      source.eject()
      r = source
    }
    return r
  }

}
