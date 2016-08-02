import { h } from '../utils'
import Frame from './frame.jsx'

export default class Statusbar extends Frame {

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        background: '#ddd',
        height: 22,
        maxHeight: 22,
        borderTop: '1px solid #bbb',
        justifyContent: 'space-between',

        '& .section': {
          margin: '0 4px',
          fontFamily: 'Helvetica',
          fontSize: 12,
        }
      }
    })
  }

  render ({ text }) {
    return <div class='flex-center align-middle'>
      { text.split('|').map(i => <span class='section'>{ i }</span>) }
    </div>
  }

}
