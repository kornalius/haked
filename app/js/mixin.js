const mixin_extend = (base, ...mixins) => {
  for (let mixin of mixins) {
    for (let prop in mixin) {
      let descriptor = Object.getOwnPropertyDescriptor(mixin, prop)
      if (prop !== 'init' && prop !== 'shut') {
        Object.defineProperty(base, prop, descriptor)
      }
    }
  }
  return base
}

const mixin = (Parent, ...mixins) => {
  class Mixed extends Parent {}
  mixin_extend(Mixed.prototype, ...mixins)
  Mixed.prototype._mixins = mixins
  return Mixed
}

export {
  mixin,
  mixin_extend,
}
