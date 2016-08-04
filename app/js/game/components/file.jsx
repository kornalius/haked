import { h } from '../../utils'
import Frame from '../../components/frame.jsx'

export default class FileElement extends Frame {

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        cursor: 'default',

        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none',

        justifyContent: 'space-between',
        padding: 4,
        border: '1px solid #cccccc',
        borderRadius: 2,
      }
    })
  }

  render ({ data }) {
    return <div class='flex-center align-middle'>
      <span>{ data.filename }</span>
      <span>{ data.size }</span>
      <span>{ data.date }</span>
    </div>
  }

}
