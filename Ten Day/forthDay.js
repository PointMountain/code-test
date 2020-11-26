const once = function (callback) {
  return function (...args) {
    if (callback) {
      const ret = callback.apply(this, args)
      callback = null
      return ret
    } else {
      throw new Error('function was destoryed')
    }
  }
}

let add = once((a, b) => a + b)

console.log(add(1, 2))
console.log(add(3, 4))

const throttle = function (callback, ms = 1000) {
  let timer = null
  return function (...args) {
    if (!timer) {
      const ret = callback.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, ms)
      return ret
    }
  }
}

const debounce = function (callback, ms = 1000) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      return callback.apply(this, args)
    }, ms);
  }
}

const intercept = function (callback, {
  beforeCall = null,
  afterCall = null
}) {
  return function (...args) {
    if (!beforeCall || beforeCall.call(this, args) !== false) {
      const ret = callback.apply(this, args)
      if (afterCall) return afterCall.call(this, args)
      return ret
    }
  }
}

const mySetTimeout = intercept(setTimeout, {
  beforeCall(args) {
    [args[0], args[1]] = [args[1], args[0]]
  }
})
mySetTimeout(1000, () => {
  console.log('调换settimeout传参顺序')
})