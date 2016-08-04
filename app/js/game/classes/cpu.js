import { mixin } from '../../utils'

import Hardware from './hardware'

import Memory from '../mixins/memory'
import Spd from '../mixins/spd'
import Max from '../mixins/max'
import Latency from '../mixins/latency'

export default class Cpu extends mixin(Hardware, Memory, Spd, Max, Latency) {

  constructor (owner, spd, latency) {
    super(owner)
    this.initMemory(100)
    this.initSpd(spd || 100)
    this.initLatency(latency)
  }

  tick () {
    return this.delay((this.max - this.spd) * this.latency)
  }

}
