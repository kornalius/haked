import Software from '../software'
import OS from '../os'

export default class NOS extends OS {

  constructor (drive, parent) {
    super(drive, parent, 'NOS', 64, '1.0', 5)
    this.define('processes', { type: [Software], linked: true, singular: 'process' })
  }

}
