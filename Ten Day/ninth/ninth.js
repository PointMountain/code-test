let handler = {
  get: function(target, name){
    if(name in target) {
      return target[name];
    }
    throw new Error('invalid property');
  }
}
function Base() {}
Base.prototype = new Proxy({}, handler)

class A extends Base{
  constructor(){
    super()
    this.a = 1
    this.b = 2
  }
}
let a = new A()
console.log(a)

function Configure(config = {}) {
  return new Proxy(config, {
    get(target, key, reveiver) {
      if(!Reflect.has(target, key) && key !== 'toJSON') {
        const ret = {}
        Reflect.set(target, key, ret)
        return new Configure(ret)
      } else {
        const ret = Reflect.get(target, key)
        if(ret && typeof ret === 'object') {
          return new Configure(ret)
        }
        return ret
      }
    }
  })
}