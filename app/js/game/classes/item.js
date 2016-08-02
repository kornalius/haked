import { mixin } from '../../utils'

import Base from '../../classes/base'

import Parent from '../../mixins/parent-children'

import Name from '../mixins/name'
import Desc from '../mixins/desc'
import Icon from '../mixins/icon'
import Qty from '../mixins/qty'
import Value from '../mixins/value'
import Owner from '../mixins/owner'

export default class Item extends mixin(Base, Owner, Parent, Name, Desc, Icon, Qty, Value) {

  constructor (owner) {
    super()
    this._owner = owner
  }

}
