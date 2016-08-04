import { h, _ } from '../../utils'
import Frame from '../../components/frame.jsx'
import Panel from '../../components/panel.jsx'
import TerminalElement from './terminal.jsx'

export default class GameElement extends Frame {

  constructor () {
    super(...arguments)
    _.extend(this.state, {
      ram: [],
      log: [],
      inventory: [],
    })
  }

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

  render () {
    return <div>

      <Panel title='RAM'>
        <TerminalElement lines={ this.state.ram }></TerminalElement>
      </Panel>

      <Panel title='Log'>
        <TerminalElement lines={ this.state.log }></TerminalElement>
      </Panel>

      <Panel title='Inventory'>
        <TerminalElement lines={ this.state.inventory }></TerminalElement>
      </Panel>

    </div>
  }

}
