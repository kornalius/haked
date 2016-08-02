import { h, render, mixin } from './utils'
import Base from './classes/base'
import Rect from './classes/rect'
import Company from './game/classes/company'
import Select from './mixins/select'
import Set from './mixins/set'
import Observable from './mixins/observable'
import ParentChildren from './mixins/parent-children'
import Panel from './components/panel.jsx'
import Frame from './components/frame.jsx'
import Game from './game/classes/game'
import App from './game/classes/app'

let app = new App()

// class MyClass extends mixin(Base, Select, ParentChildren, Observable) {

//   test () {
//     this.arr = []
//     this.obj = {}
//     this.val = 0

//     this.observe('arr')
//     this.observe('obj')
//     this.observe('val')

//     this.on('object.changed', (...args) => {
//       console.log('object.changed', this, ...args)
//     })
//     this.on('object.changed.val', (...args) => {
//       console.log('object.changed.val', this, ...args)
//     })

//     this.arr.push('first')
//     this.arr.push('second')
//     this.arr.push('third')

//     this.val = 10

//     this.obj.a = 20
//     this.obj.b = 30

//     this.on('test-event', (...args) => {
//       console.log('test-event', this, ...args)
//     })

//     this.emit('test-event', 1, 2, 3, 4, 5, 6, 7, 8)
//   }

// }

// class MyClass2 extends mixin(Base, Set) {
// }

// var o = new MyClass()
// console.log(o)
// o.selected = true
// o.test()

// o.defer(o.destroy)


// var o2 = new MyClass2()
// console.log(o2)
// o2.addValidSet('abc', 'def')
// o2.set('abc')
// console.log(o2.isSet('abc'))
// console.log(o2.isSet('def'))
// // o2.unset('abc')
// o2.abc = false
// console.log(o2.isSet('abc'))
// console.log(o2.abc)

// o2.defer(o2.destroy)


// var r = new Rect(10, 10, 100, 100)
// console.log(r)

let j = window._app.store.toJSON()
console.log(j)
// console.log(new Game().parse(j))

console.log(window._app.store)
window._app.store.addCompany(new Company())

// window._frame = render(<Frame/>, document.body)
// window._frame._component.addFrame(
//   <Panel>
//     <div id='content' class='flex flex-column'>
//       <span>Line 1</span>
//       <span>Line 2</span>
//       <span>Line 3</span>
//     </div>
//   </Panel>
// )

// window._frame._component.addFrame(<Panel />)
// window._frame._component.addFrame(<Panel />)
