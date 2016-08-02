import Drive from './drive'

export default class HardDrive extends Drive {

  constructor (owner) {
    super(owner)
    this.define('root', { type: File, default: new File(this, '/', true) })
  }

}
