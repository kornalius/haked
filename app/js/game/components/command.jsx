import { h } from '../../utils'
import Frame from '../../components/frame.jsx'

export default class CommandElement extends Frame {

  style () {
    return this.mergeStyles(super.style(), {
      root: {
        cursor: 'default',

        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none',

        padding: 4,
        backgroundColor: '#ff8000',
        color: '#333333',
        border: '1px solid #cccccc',
        borderRadius: 2,
      }
    })
  }

  render ({ data }) {
    return <div class='flex-center align-middle'>
      <span>{ data.name }</span>
    </div>
  }

}
