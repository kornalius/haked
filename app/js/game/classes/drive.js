import { mixin } from '../../utils'

import Hardware from './hardware'

import Fs from '../mixins/fs'

export default class Drive extends mixin(Hardware, Fs) {

}
