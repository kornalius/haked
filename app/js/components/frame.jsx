import { h, render, _ } from '../utils'
import BaseElement from '../classes/base-element'

export default class Frame extends BaseElement {

  componentDidMount () {
    super.componentDidMount()
    this.element.addEventListener('mousedown', e => e.target._component && e.target._component.emit('mouse.down', e))
    this.element.addEventListener('mousemove', e => e.target._component && e.target._component.emit('mouse.move', e))
    this.element.addEventListener('mouseup', e => e.target._component && e.target._component.emit('mouse.up', e))
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.element.removeEventListener('mousedown')
    this.element.removeEventListener('mousemove')
    this.element.removeEventListener('mouseup')
  }

  get childFrames () { return this.querySelectorAll('Frame') }

  addFrame (props) {
    let el
    if (_.isElement(props)) {
      el = props
    }
    else if (props.nodeName) {
      el = render(props, this.element)
    }
    else {
      el = render(<Frame { ...props }></Frame>, this.element)
    }
    return el
  }

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        display: 'flex',
        flex: '1 1 auto',
        minWidth: '1em',
        minHeight: '1em',
      }
    })
  }

  render ({ className, children }) {
    return <div class={ className }>{ children }</div>
  }

}
