import { mixin_extend, _ } from '../utils'

import shortid from 'shortid'
import { Component } from 'preact'

import { create } from 'jss'
import defaultUnit from 'jss-default-unit'
import camelCase from 'jss-camel-case'
import extend from 'jss-extend'
// import isolate from 'jss-isolate'
import nested from 'jss-nested'

import BaseMixin from '../mixins/base'
import StoreMixin from '../mixins/store'

export default class BaseElement extends Component {

  constructor (state = {}) {
    super()

    this.initStore()
    this.initBase()

    this._css_id = shortid.generate()

    this._jss = create({
      generateClassName: (stylesStr, rule) => {
        return rule.name ? rule.name + '-' + this._css_id : this._css_id
      }
    })
    this._jss.use(extend())
    this._jss.use(nested())
    this._jss.use(camelCase())
    this._jss.use(defaultUnit())
    // this._jss.use(isolate())

    this._stylesheet = null

    this.setState(state)

    this._binds = {}
    for (let f in this) {
      if (_.isFunction(this[f])) {
        this._binds[f] = this[f].bind(this)
      }
    }
  }

  get element () { return this.base }
  get binds () { return this._binds }

  get css () { return this._attachStylesheet().classes }

  get children () { return this.element.children }
  get parentNode () { return this.element.parentNode }

  appendChild (el) {
    this.element.appendChild(el)
    return this
  }

  querySelector (selector) { return this.element.querySelector(selector) }

  querySelectorAll (selector) { return Array.from(this.element.querySelectorAll(selector)) }

  _attachStylesheet () {
    if (!this._stylesheet) {
      this._stylesheet = this._jss.createStyleSheet(this.style() || {}, { meta: this.constructor.name }).attach()
    }
    return this._stylesheet
  }

  _detachStylesheet () {
    if (this._stylesheet) {
      this._stylesheet.detach()
      this._stylesheet = null
    }
  }

  mergeStyles (sup, style) {
    return _.merge({}, sup, style)
  }

  style () {
    return {}
  }

  componentWillReceiveProps () {
  }

  componentWillMount () {
  }

  componentDidMount () {
    if (this.base && this.css.root) {
      this.base.classList.add(this.css.root)
    }
  }

  componentWillUnmount () {
  }

  componentDidUnmount () {
    this._detachStylesheet()
  }

  shouldComponentUpdate () {
    return true
  }

  shouldComponentUpdateStylesheet () {
    return false
  }

  componentWillUpdate () {
    if (this.shouldComponentUpdateStylesheet()) {
      this._detachStylesheet()
      this._attachStylesheet()
    }
  }

  componentDidUpdate () {
  }

  // render (props, state) {
  // }

}

mixin_extend(BaseElement.prototype, BaseMixin)
mixin_extend(BaseElement.prototype, StoreMixin)
