import Script from '../classes/script'

export default {

  initScript (script = null) {
    this.define('script', { type: Script, default: script })
  },

}
