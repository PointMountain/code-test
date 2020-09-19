const host = 'http://livegw-tst.changingedu.com/livewebapi/api/pb'

export function get(methodName, params = {}){
  let paramArray = []
  Object.keys(params).forEach(current => {
    paramArray.push(`${current}=${params[current]}`)
  })
  params = paramArray.join('&')
  return new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest()
    xhr.open('GET', `${host}/${methodName}?${params}`, true)
    xhr.onload = function(){
      if(xhr.status === 200) {
        resolve(xhr.responseText)
      }else{
        reject(new Error(xhr.statusText))
      }
    }
    xhr.onerror = function(){
      reject(new Error(xhr.statusText))
    }
    xhr.send()
  })
}

export function post(methodName, query){
  return new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest()
    xhr.open('POST', `${host}/${methodName}`, true)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.onload = function(){
      if(xhr.status === 200) {
        resolve(xhr.responseText)
      }else{
        reject(new Error(xhr.statusText))
      }
    }
    xhr.onerror = function(){
      reject(new Error(xhr.statusText))
    }
    xhr.send(query)
  })
}