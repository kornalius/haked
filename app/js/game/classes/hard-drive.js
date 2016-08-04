import { mixin } from '../../utils'

import Memory from './memory'

import Root from '../mixins/root'

export default class HardDrive extends mixin(Memory, Root) {

  constructor (owner, size, used) {
    super(owner, size, used)
    this.initRoot(owner, this)
  }

}
