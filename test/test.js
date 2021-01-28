var fn = null
const foo = () => {
  var a = 2
  function innerFoo() {
    console.log(a)
  }
  fn = innerFoo
}
foo()
fn()

const runPromiseInSequence = (array, value) => {
  array.reduce((promiseChain, currentFun) => {
    console.log(promiseChain)
    return promiseChain.then(currentFun)
  }, Promise.resolve(value))
}
const fn1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('fn1')
    resolve(1)
  }, 1000)
})
const fn2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('fn2')
    resolve(2)
  }, 1000)
})
const array = [fn1, fn2]
runPromiseInSequence(array, 'init')

const pipe = (...functions) => input => functions.reduce(
  (acc, fn) => fn(acc),
  input
)

const compose = (...funcs) => (...args) => funcs.reduce(
  (a, b) => a(b(...args))
)