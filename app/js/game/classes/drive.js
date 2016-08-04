import { mixin } from '../../utils'

import Hardware from './hardware'

import Spd from '../mixins/spd'
import Fs from '../mixins/fs'
import Latency from '../mixins/latency'
import Max from '../mixins/max'

export default class Drive extends mixin(Hardware, Fs, Spd, Max, Latency) {

  constructor (owner, spd, max, latency) {
    super(owner)
    this.initFs()
    this.initSpd(spd || 1)
    this.initMax(max || 100)
    this.initLatency(latency || 250)
  }

  tick () {
    // play sound
    return this.delay((this.max - this.spd) * this.latency)
  }

}
