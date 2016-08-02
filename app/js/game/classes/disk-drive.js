import { _ } from '../../utils'

import Drive from './drive'
import Diskette from './diskette'

export default class DiskDrive extends Drive {

  constructor (owner, diskette) {
    super(owner)
    this.define('diskette', { type: Diskette, linked: true, default: diskette })
  }

  get isLoaded () { return !_.isNull(this.diskette) }

  insert (diskette) {
    if (!this.isLoaded) {
      this.diskette = diskette
    }
  }

  eject () {
    if (this.isLoaded) {
      this.diskette = null
    }
  }

}
