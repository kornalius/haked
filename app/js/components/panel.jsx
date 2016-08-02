import { h, mixin } from '../utils'
import Frame from './frame.jsx'
import Titlebar from './titlebar.jsx'
import Statusbar from './statusbar.jsx'

export default class Panel extends Frame {

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        cursor: 'default',

        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none',

        justifyContent: 'space-between',
        border: '1px solid #777',
        background: '#fcfcfc',
        height: '30em',
        margin: 4,
      }
    })
  }

  render ({ children }) {
    return <div class='flex-column flex-grow'>

        <Titlebar id='title' class='row flex-start' text='Testing'></Titlebar>

        <div id='content' class='row flex-stretch'>
          { children }
        </div>

        <Statusbar id='status' class='row flex-end' text='100%|Modified|Spaces:2'></Statusbar>

      </div>
  }

}
