import { h } from '../../utils'
import Frame from '../../components/frame.jsx'
import TerminalLineElement from './terminal-line.jsx'

export default class TerminalElement extends Frame {

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        cursor: 'default',

        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none',

        background: '#333333',
        color: '#ffcc66',
        width: '100%',
        height: '100%',
      }
    })
  }

  render ({ lines }) {
    return <div>
      <div id="lines">
        { lines.map(l => <terminal-line line={ l }></terminal-line>) }
      </div>
    </div>
  }

}
