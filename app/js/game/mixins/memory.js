import { mixin_extend } from '../../utils'

import Size from './size'
import Used from './used'

export default mixin_extend({}, Size, Used, {

  initMemory (size = 64, used = 0) {
    this.initSize(size)
    this.initUsed = used
  },

  get available () { return this.size - this.used },

  alloc (sz) {
    if (this.canAlloc(sz)) {
      this.used += sz
    }
  },

  free (sz) {
    this.used = Math.max(0, this.used - sz)
  },

  canAlloc (sz) { return sz <= this.available },

})
