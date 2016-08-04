import Command from '../command'
import Diskette from '../diskette'
import DiskDrive from '../diskdrive'

export default class Insert extends Command {

  exec (source, target) {
    let r = super(source, target)
    if (source instanceof Diskette && target instanceof DiskDrive) {
      target.insert(source)
      r = source
    }
    return r
  }

}
