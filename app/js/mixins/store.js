import { _, moment, uuid } from '../utils'
import faker from 'faker'

window._rootIndex = {}
var refs = []

export default {

  initStore () {
    this.$fields = {}
    this.id = uuid.v4()
  },

  parentPath (path) { return _.initial(path.split('.')).join('.') },

  notify (path, event, newValue, oldValue) {
    if (newValue && _.isString(newValue.id)) {
      if (event === 'insert') {
        window._rootIndex[newValue.id] = newValue
      }
      else if (event === 'remove') {
        window._rootIndex[newValue.id] = undefined
      }
      else if (event === 'change') {
        if (oldValue && _.isString(oldValue)) {
          window._rootIndex[oldValue.id] = undefined
        }
        window._rootIndex[newValue.id] = newValue
      }
    }
    this.emit(path + '.' + event, newValue, oldValue)
    console.info(path, event, newValue, oldValue)
  },

  get (path) { return _.get(this, path) },

  push (path, e) {
    this.get(path).push(e)
    this.notify(path, 'insert', e)
    return e
  },

  unshift (path, e) {
    this.get(path).unshift(e)
    this.notify(path, 'insert', e)
    return e
  },

  pop (path) {
    let e = this.get(path).pop()
    this.notify(path, 'remove', e)
    return this
  },

  shift (path) {
    let e = this.get(path).shift()
    this.notify(path, 'remove', e)
    return this
  },

  pull (path, e) {
    e = _.isString(e) ? window._rootIndex[e] : e
    _.pull(this.get(path), e)
    this.notify(path, 'remove', e)
    return this
  },

  clear (path) {
    this.notify(path, 'clear', [], this.get(path))
    _.set(this, path, [])
    return this
  },

  define (n, f) {
    this.$fields[n] = f
    let pname = '_' + n

    if (f.type instanceof moment) {
      Object.defineProperty(this, n, {
        configurable: true,
        get: () => { return this[pname] },
        set: !f.private ? value => {
          let v = this[pname]
          if (v !== value) {
            let old = v
            this[pname] = moment(value, 'DD-MM-YYYY')
            this.notify(n, 'change', value, old)
          }
        } : undefined,
      })
    }

    else {
      Object.defineProperty(this, n, {
        configurable: true,
        get: () => { return this[pname] },
        set: !f.private ? value => {
          let v = this[pname]
          if (v !== value) {
            let old = v
            if (old && _.isString(old.id)) {
              window._rootIndex[old.id] = undefined
            }
            if (value && _.isString(value.id)) {
              window._rootIndex[value.id] = value
            }
            this[pname] = value
            this.notify(n, 'change', value, old)
          }
        } : undefined,
      })
    }

    if (f.type === Array || _.isArray(f.type)) {
      let C = _.isArray(f.type) ? f.type[0] : Object
      let search = f.searchField
      let sn = f.singular
      let csn = _.capitalize(sn)

      this.constructor.prototype['has' + csn] = obj => { return this[sn + 'Index'](obj) !== -1 }

      this.constructor.prototype[sn + 'Index'] = obj => {
        if (!_.isString(obj) && obj instanceof C) {
          obj = obj[search]
        }
        let e = _.find(this[pname], { [search]: obj })
        return e ? this[pname].indexOf(e) : -1
      }

      this.constructor.prototype['find' + csn] = obj => {
        let i = this[sn + 'Index'](obj)
        return i !== -1 ? this[pname][i] : null
      }

      this.constructor.prototype['add' + csn] = obj => {
        let e = this['find' + csn](obj)
        if (!e) {
          if (obj instanceof C) {
            e = obj
          }
          else {
            e = new C()
          }
          this.push(n, e)
        }
        return this
      }

      this.constructor.prototype['remove' + csn] = obj => {
        let e = this['find' + csn](obj)
        if (e) {
          this.pull(n, e)
        }
        return this
      }

      this.constructor.prototype['random' + csn] = () => { return faker.random.arrayElement(this[pname]) }
    }

    let d = f.default
    if (_.isNull(d) || _.isUndefined(d)) {
      if (f.type === Object) {
        d = {}
      }
      else if (f.type === Array || _.isArray(f.type)) {
        d = []
      }
      else if (f.type === String) {
        d = ''
      }
      else if (f.type === Number) {
        d = 0
      }
      else if (f.type === Boolean) {
        d = false
      }
      else if (f.type === moment) {
        d = moment()
      }
      else if (_.isUndefined(d) && f.type !== this.constructor && !f.linked) {
        let C = f.type
        d = new C()
      }
    }

    this[pname] = d

    if (d && _.isString(d.id)) {
      window._rootIndex[d.id] = d
    }
  },

  _linkObjectRefs (n) {
    for (let r of refs) {
      _.set(n, r.path, window._rootIndex[r.id])
    }
    refs = []
  },

  parse (r, type, path) {
    r = _.isString(r) ? JSON.parse(r) : r
    if (!type) {
      type = this.constructor
    }
    let C = type
    let n = new C()

    let fields = n.$fields

    for (let name in fields) {
      let f = fields[name]
      let v = r[name]

      if (!_.isUndefined(v)) {
        let pname = '_' + name
        let _path = path + '.' + name

        if (f.type === Object) {
          if (!f.linked) {
            this[pname] = v
            if (v && _.isString(v.id)) {
              window._rootIndex[v.id] = v
            }
          }
          else {
            refs.push({ f, id: v.id, path: _path })
          }
        }

        else if (f.type === Array || _.isArray(f.type)) {
          let type = _.isArray(f.type) ? f.type[0] : Object
          let a = []
          if (!f.linked) {
            for (let i = 0; i < v.length; i++) {
              let vv = v[i]
              a.push(n.parse(vv, type, _path + '.' + i))
              if (vv && _.isString(vv.id)) {
                window._rootIndex[vv.id] = vv
              }
            }
          }
          else {
            for (let i = 0; i < v.length; i++) {
              refs.push({ f, id: v[i], path: _path + '.' + i })
            }
          }
          this[pname] = a
        }

        else if (!f.linked) {
          this[pname] = v
          if (v && _.isString(v.id)) {
            window._rootIndex[v.id] = v
          }
        }

        else {
          refs.push({ f, id: v, path: _path })
        }
      }
    }

    this._linkObjectRefs(n)

    return n
  },

  toJSON () {
    let r = { id: this.id }

    for (let name in this.$fields) {
      let f = this.$fields[name]

      if (!f.private) {
        let v = this['_' + name]

        if (!_.isUndefined(v)) {
          if (f.type === Array || _.isArray(f.type)) {
            let a = []
            for (let i of v) {
              a.push(!f.linked ? i.toJSON() : i.id)
            }
            r[name] = a
          }

          else if (f.type === moment) {
            r[name] = v.format('DD-MM-YYYY')
          }

          else if (_.isObject(v)) {
            r[name] = !f.linked ? v.toJSON() : v.id
          }

          else if (!f.linked) {
            r[name] = v
          }

          else {
            r[name] = v.id
          }
        }
      }
    }

    return r
  },

}
