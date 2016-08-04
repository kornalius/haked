import { mixin } from '../utils'
import Base from './base'
import PointMixin from '../mixins/point'

export default class Point extends mixin(Base, PointMixin) {

  constructor (x, y) {
    super()
    this.initPoint(x, y)
  }

}

Point.constructor.prototype.fromArray = a => { return new Point(a[0], a[1]) }

Point.constructor.prototype.lerp = (a, b, fraction) => { return b.sub(a).multiply(fraction).add(a) }

Point.constructor.prototype.max = (a, b) => { return new Point(Math.max(a.x, b.x), Math.max(a.y, b.y)) }

Point.constructor.prototype.min = (a, b) => { return new Point(Math.min(a.x, b.x), Math.min(a.y, b.y)) }

Point.constructor.prototype.randomDirection = () => { return Point.fromAngle(Math.random() * Math.PI * 2) }

Point.constructor.prototype.fromAngle = theta => { return new Point(Math.cos(theta), Math.sin(theta)) }

Point.constructor.prototype.distance = (a, b) => { return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) }
