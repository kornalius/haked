export default {

  initParentChildren (parent = null, children = []) {
    this.define('parent', { type: Object, linked: true, default: parent })
    this.define('children', { type: Array, default: children })
  },

  shut () {
    this.forEach(c => {
      c.destroy()
    })
    this.clearChildren()
  },

  get hasParent () { return this.parent !== null },
  get hasChildren () { return this.children.length > 0 },

  root () {
    let p = this.parent
    while (p.parent) {
      p = p.parent
    }
    return p
  },

  clearChildren () {
    this.forEach((child, idx) => { child.emit('object.remove', idx) })
    this.children = []
    return this
  },

  appendChild (c) {
    this.children.push(c)
    this.emit('object.append', c)
    return this
  },

  insertAt (idx, c) {
    if (idx >= 0 && idx < this.children.length - 1) {
      this.children.splice(idx, 0, c)
      this.emit('object.insert', c, idx)
    }
    else if (idx === this.children.length - 1) {
      this.appendChild(c)
    }
    return this
  },

  removeAt (idx) {
    if (idx >= 0 && idx < this.children.length) {
      this.children.splice(idx, 1)
      this.emit('object.delete', idx)
    }
    return this
  },

  insertBefore (before, c) {
    return this.insertAt(this.children.indexOf(before), c)
  },

  insertAfter (after, c) {
    return this.insertAt(this.children.indexOf(after) + 1, c)
  },

  removeChild (c) {
    return this.removeAt(this.children.indexOf(c))
  },

  childIndex (c) {
    return this.children.indexOf(c)
  },

  hasChild (c) {
    return this.children.indexOf(c) !== -1
  },

  forEach (cb) {
    let len = this.children.length
    for (let idx = 0; idx < len; idx++) {
      cb.call(this, this.children[idx], idx)
    }
    return this
  },

}
