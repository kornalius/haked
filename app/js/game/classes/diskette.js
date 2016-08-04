import { mixin } from '../../utils'

import Memory from './memory'
import DiskDrive from './disk-drive'

import Root from '../mixins/root'

export default class Diskette extends mixin(Memory, Root) {

  constructor (owner, drive, size, used) {
    super(owner, size, used)
    this.initRoot()
    this.define('drive', { type: DiskDrive, linked: true, default: drive })
  }

}
