export default {

  initMouse () {
    this.define('over', { type: Object })
    this.define('mousePos', { type: Object })
    this.define('lastEvent', { type: Object })

    this.define('mouseButtons', { type: Object, default: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    } })

    this._mouseDispatch = this.mouseDispatch.bind(this)
    this._mouseWheelDispatch = this.mouseWheelDispatch.bind(this)

    document.body.addEventListener('mousedown', this._mouseDispatch)
    document.body.addEventListener('mouseup', this._mouseDispatch)
    document.body.addEventListener('mousemove', this._mouseDispatch)
    document.body.addEventListener('click', this._mouseDispatch)
    document.body.addEventListener('dblclick', this._mouseDispatch)
    document.body.addEventListener('mousewheel', this.mouseWheelDispatch)
  },

  shut () {
    document.body.removeEventListener('mousedown', this._mouseDispatch)
    document.body.removeEventListener('mouseup', this._mouseDispatch)
    document.body.removeEventListener('mousemove', this._mouseDispatch)
    document.body.removeEventListener('click', this._mouseDispatch)
    document.body.removeEventListener('dblclick', this._mouseDispatch)
    document.body.removeEventListener('mousewheel', this.mouseWheelDispatch)
  },

  mouseDispatch (e) {
    this.lastEvent = e

    let tar = e.target ? e.target : e.srcElement
    let pos = { x: e.clientX, y: e.clientY }
    let x
    let y
    let type = e.type

    if (typeof e.which === 'undefined') {
      e.mouseButton = e.button < 2 ? this.mouseButtons.LEFT : e.button === 4 ? this.mouseButtons.MIDDLE : this.mouseButtons.RIGHT
    }
    else {
      e.mouseButton = e.which < 2 ? this.mouseButtons.LEFT : e.which === 2 ? this.mouseButtons.MIDDLE : this.mouseButtons.RIGHT
    }

    e.realX = x = this.mousePos.x = pos.x
    e.realY = y = this.mousePos.y = pos.y

    let closest = this.findClosest(x, y, tar)

    if (closest) {
      if (closest._component) {
        closest = closest._component
      }
      if (type === 'mousedown') {
        closest.emit('mouse.down', e)
      }
      else if (type === 'mousemove') {
        if (this._over !== closest) {
          if (this._over) {
            this._over.emit('mouse.out', e)
            this._over = null
          }
          this._over = closest
        }
        closest.emit('mouse.move', e)
      }
      else if (type === 'mouseup') {
        closest.emit('mouse.up', e)
      }
    }

    else if (type === 'mousemove') {
      if (this._over) {
        this._over.emit('mouse.out', e)
        this._over = null
      }
    }

    if (type === 'mousemove') {
      this.lastEvent = e
    }
  },

  findClosest (x, y, target) {
    let tar = target
    while (tar) {
      if (tar.matches && tar.matches('.mouse') && tar.pointInRect({ x, y })) {
        return tar
      }
      tar = tar.parentNode
    }
    return null
  },

  mouseWheelDispatch (e) {
    e.direction = e.detail < 0 || e.wheelDelta > 0 ? 1 : -1
    this.emit('mouse.scroll', e)
  },

}
