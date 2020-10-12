import { getAllValidElements, getRealHeight, findAbnormalImage, checkHasStyleNode, getElementPath, setNodeClickTime } from './dom'
import { post, get } from './utils/tracker'
import onload from './utils/onload'
const validElements = getAllValidElements()
validElements.forEach(element => {
  if(element.tagName === 'IMG') {
    findAbnormalImage(element)
  } else if(element.style.height || element.style.width){
    checkHasStyleNode(element)
  }
})

window.addEventListener('click', (e) => {
  if(e.target.className === 'click-times-pop' || e.target.tagName === 'HTML' || e.target.tagName === 'BODY') return
  let path = getElementPath(e.target)
  let href = location.href
  let site = 'liveweb'
  let env = 'tst'
  let version = '1.1.2'
  let data = {
    site,
    env,
    keycode: path,
    href,
    version
  }
  post('setRequestLog', JSON.stringify(data))
}, true)

function callback(){
  let href = location.href
  let site = 'liveweb'
  let env = 'tst'
  let version = '1.1.2'
  let data = {
    site,
    env,
    href,
    version
  }
  setTimeout(() => {
    post('getRequestLog', JSON.stringify(data)).then(res => {
      let nodeList = document.querySelectorAll('.click-times-pop')
      for (let i = 0; i < nodeList.length; i++) {
        document.body.removeChild(nodeList[i])
      }
      let resObj = JSON.parse(res)
      if(resObj.response && resObj.response.error_code === 0) {
        let data = resObj.data || []
        data.forEach(item => {
          setNodeClickTime(item.keycode, item.count)
        })
      }
    })
  }, 1000)
}

onload(callback)

window.addEventListener('resize', callback)

