import { h } from '../utils'
import Frame from './frame.jsx'

export default class Titlebar extends Frame {

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        background: '#ddd',
        height: 42,
        maxHeight: 42,
        borderBottom: '1px solid #bbb',

        '& #text': {
          marginLeft: 8,
          fontFamily: 'Helvetica',
          fontWeight: 'bold',
        }
      }
    })
  }

  render ({ text }) {
    return <div class='flex-center align-middle'>
      <span id='text'>{ text }</span>
    </div>
  }

}
