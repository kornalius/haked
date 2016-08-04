import { mixin_extend } from '../../utils'

import Random from './random'

export default mixin_extend({}, Random, {

  initIp (ip) {
    this.define('ip', { type: String, default: ip || this.random.ip() })
  },

})
