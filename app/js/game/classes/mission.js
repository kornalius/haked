import { mixin } from '../../utils'

import Base from '../../classes/base'

import Parent from '../../mixins/parent-children'

import Name from '../mixins/name'
import Desc from '../mixins/desc'
import Icon from '../mixins/icon'
import Qty from '../mixins/qty'
import Source from '../mixins/source'
import Target from '../mixins/target'

export default class Mission extends mixin(Base, Name, Desc, Icon, Parent, Source, Target, Qty) {

  constructor (owner, name, desc, icon, parent, source, target, qty) {
    super()
    this.initOwner(owner)
    this.initName(name)
    this.initDesc(desc)
    this.initIcon(icon)
    this.initParentChildren(parent)
    this.initSource(source)
    this.initTarget(target)
    this.initQty(qty)
  }
}
