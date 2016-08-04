import { mixin } from '../../utils'

import Hardware from './hardware'

import MemoryMixin from '../mixins/memory'

export default class Memory extends mixin(Hardware, MemoryMixin) {

  constructor (owner, size, used) {
    super(owner)
    this.initMemory(size, used)
  }

}
