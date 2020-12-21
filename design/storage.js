class StorageBase {
  setItem(key, value, expirse) {
    if (expirse) {
      let options = {
        value,
        startTime: Date.now(),
        expirse
      }
      localStorage.setItem(key, JSON.stringify(options))
    } else {
      let type = Object.prototype.toString.call(value)
      if (type === '[object Object]') {
        value = JSON.stringify(value)
      }
      if (type === '[object Array]') {
        value = JSON.stringify(value)
      }
      localStorage.setItem(key, value)
    }
  }

  getItem(key) {
    let item = localStorage.getItem(key)
    if (!item) return false
    item = JSON.parse(item)
    if (item.startTime) {
      let date = Date.now()
      if (date - item.startTime > item.expirse) {
        localStorage.removeItem(key)
        return false
      } else {
        return item.value
      }
    } else {
      return item
    }
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }
}

const Storage = (function () {
  let instance = null
  return function () {
    if (!instance) {
      instance = new StorageBase
    }
    return instance
  }
})()

export default Storage