import { mixin, moment } from '../../utils'

import Base from '../../classes/base'

import User from './user'
import File from './file'

import Owner from '../mixins/owner'
import Random from '../mixins/random'

export default class Email extends mixin(Base, Owner, Random) {

  constructor (owner, from, to, date, subject, message, attachments) {
    super()
    this.initOwner(owner)
    this.define('from', { type: User, linked: true, default: from })
    this.define('to', { type: User, linked: true, default: to })
    this.define('date', { type: moment, default: date })
    this.define('subject', { type: String, default: subject })
    this.define('message', { type: String, default: message })
    this.define('attachments', { type: [File], singular: 'attachment', searchField: 'filename', default: attachments })
  }

}
