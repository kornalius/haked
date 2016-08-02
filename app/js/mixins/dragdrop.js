export default {

  init () {
    this._draggable = false
    this._dragging = false
    this._origX = null
    this._origY = null
    this._oldX = null
    this._oldY = null
    this._dir = null

    this._ondownBound = this._ondown.bind(this)
    this._onupBound = this._onup.bind(this)
    this._ondragBound = this._ondrag.bind(this)

    this.on('mouse.down', this._ondownBound)
  },

  shut () {
    this.off('mouse.down', this._ondownBound)
  },

  get draggable () { return this._draggable },
  get dragging () { return this._dragging },

  set draggable (value) { this._draggable = value },

  enableDrag () {
    this._draggable = true
    return this
  },

  disableDrag () {
    this._draggable = false
    return this
  },

  dragDirection (dir) {
    if (!dir) {
      this._dir = null
    }
    else if (_.isNumber(dir)) {
      this._dir = { x: Math.cos(dir / 180 * Math.PI), y: Math.sin(dir / 180 * Math.PI) }
    }
    else if (dir.x === 0 && dir.y === 0) {
      this._dir = { x: 0, y: 0 }
    }
    else {
      let r = Math.sqrt(dir.x * dir.x + dir.y * dir.y)
      this._dir = { x: dir.x / r, y: dir.y / r }
    }
    return this
  },

  _ondown (e) {
    if (e.button === this.mouseButtons.LEFT) {
      this.startDrag(e)
    }
  },

  _ondrag (e) {
    if (this._dragging && e.clientX !== 0 && e.clientY !== 0) {
      this.emit('drag.move', e)

      if (this._dir) {
        if (this._dir.x !== 0 || this._dir.y !== 0) {
          let len = (e.clientX - this._origX) * this._dir.x + (e.clientY - this._origY) * this._dir.y
          this.x = this._oldX + len * this._dir.x
          this.y = this._oldY + len * this._dir.y
        }
      }
      else {
        this.x = this._oldX + (e.clientX - this._origX)
        this.y = this._oldY + (e.clientY - this._origY)
      }

      this.element.style.position = 'absolute'
      this.element.style.left = this.x + 'px'
      this.element.style.top = this.y + 'px'
    }
  },

  _onup (e) {
    if (e.button === this.mouseButtons.LEFT) {
      this.stopDrag(e)
    }
  },

  startDrag (e) {
    if (!this._dragging) {
      this._dragging = true

      this.on('mouse.move', this._ondragBound)
      this.on('mouse.up', this._onupBound)

      this.emit('drag.start', e || this.lastEvent)

      this._origX = e.clientX
      this._origY = e.clientY
      this._oldX = this._x
      this._oldY = this._y
    }
    return this
  },

  stopDrag (e) {
    if (this._dragging) {
      this._dragging = false

      this.off('mouse.move', this._ondragBound)
      this.off('mouse.up', this._onupBound)

      this.emit('drag.stop', e || this.lastEvent)
    }
    return this
  },

}

