import { h } from '../../utils'
import Frame from '../../components/frame.jsx'

import Command from '../classes/command'
import CommandElement from './command.jsx'

import File from '../classes/file'
import FileElement from './file.jsx'

export default class TerminalLineElement extends Frame {

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        cursor: 'default',

        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none',

        width: '100%',
        height: '1em',
      }
    })
  }

  render ({ items }) {
    return <div>
      {
        items.map(i => {
          if (i instanceof String) {
            return <span>{ i }</span>
          }
          else if (i instanceof Command) {
            return <CommandElement data={ i }></CommandElement>
          }
          else if (i instanceof File) {
            return <FileElement data={ i }></FileElement>
          }
          else {
            return <span></span>
          }
        })
      }
    </div>
  }

}
