import { post, get } from './utils/tracker'

const STYLES = ['font', 'padding', 'width', 'boxSizing', 'border', 'overflow', 'boxShadow', 'display', 'margin', 'lineHeight', 'letterSpacing', 'whiteSpace']

// 可不可以直接克隆一个新的dom cloneNode(true)
// 直接判断clientWidth和scrollWidth / clientHeight和scrollHeight大小差别
// 尝试将element.scrollHeight / element.scrollWidth与element.offsetHeight / element.offsetWidth进行比较
// 筛选出dom上有style的元素 src为空的元素

export function createHiddenElement(tag = 'div', styles = {}, textContent = '') {
  const element = document.createElement(tag)
  element.style.position = 'fixed'
  element.style.visibility = 'hidden'
  element.textContent = textContent
  Object.keys(styles).forEach(key => {
    element.style[key] = styles[key]
  })
  return element
}

export function getRealHeight(element){
  const { textContent, tagName } = element
  const validStyle = getElementValidStyle(element)
  const newElement = createHiddenElement(tagName, validStyle, textContent)
  document.body.appendChild(newElement)
  const height = window.getComputedStyle(newElement).height
  document.body.removeChild(newElement)
  return height
}

export function getElementValidStyle(element) {
  const cssStyle = window.getComputedStyle(element)
  const validStyle = STYLES.reduce((acc, current) => {
    acc[current] = cssStyle[current]
    return acc
  }, {})
  return validStyle
}

export function getAllValidElements() {
  const allElements = document.body.getElementsByTagName('*')
  let validElements = []
  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i]
    const cssStyle = window.getComputedStyle(element)
    if(cssStyle.display !== 'none'){ // && element.textContent !== ''
      validElements.push(element)
    }
  }
  return validElements
}

export function findAbnormalImage(imgNode) {
  // const IMAGE_REG = /\.(png|jpe?g|gif|svg)(\?\S*)?$/
  const src = imgNode.src
  let img = new Image()
  img.src = src
  img.addEventListener('error', (e) => {
    let env = 'tst'
    let href = location.href
    let courseware_id = '123213'
    let description = getElementPath(imgNode)
    let data = {
      env,
      type: 'image',
      courseware_id,
      description,
      href
    }
    // imgNode.parentNode.style.outline = '1px solid red'
    post('setHeathReport', JSON.stringify(data))
    img = null
  })
}

export function checkHasStyleNode(node) {
  let { width, height } = node.style
  const { width: realWidth, height: realHeight, overflow } = window.getComputedStyle(node)
  let env = 'tst'
  let href = location.href
  let courseware_id = '123213'
  let description = getElementPath(node)
  let data = {
    env,
    type: 'size',
    courseware_id,
    description,
    href
  }
  if(width && height) {
    if(width !== realWidth || height !== realHeight){
      post('setHeathReport', JSON.stringify(data))
      // node.style.outline = '1px solid red'
      return
    }
  }else if(!width){
    if(height !== realHeight){
      post('setHeathReport', JSON.stringify(data))
      // node.style.outline = '1px solid red'
      return
    }
  }else{
    if(width !== realWidth){
      post('setHeathReport', JSON.stringify(data))
      // node.style.outline = '1px solid red'
      return
    }
  }
  let currentHeight = getRealHeight(node)
  if(currentHeight !== realHeight && overflow !== 'hidden' && node.children.length === 0 && node.textContent !== ''){
    post('setHeathReport', JSON.stringify(data))
    // node.style.outline = '1px solid red'
  }
}
export function getElementPath(el, path){
  let currentEl = el
  let parent = el.parentElement
  if(el.nodeName === 'HTML'){
    return `${el.nodeName}${path? '/' + path : '' }`
  }
  if(!parent) return path
  if(el.nodeName === 'BODY') {
    path = `${el.nodeName}${path? '/' + path : '' }`
  } else {
    let index = getElIndex(parent, currentEl)
    path = `${el.nodeName}[${index}]${path? '/' + path : '' }`
  }
  return getElementPath(parent, path)
}

export function getElementByPath(path) {
  let pathArray = path.split('/')
  let currentElement = document.documentElement
  for (let i = 0; i < pathArray.length; i++) {
    const item = pathArray[i]
    if(item === 'HTML') continue
    const parseArray = item.match(/\d+/)
    if(parseArray){
      let index = Number(parseArray[0])
      currentElement = currentElement.children.item(index)
    } else {
      currentElement = currentElement.querySelector(item)
    }
  }
  return currentElement
}

export function setNodeClickTime(path, count){
  let el = getElementByPath(path)
  if(!el || el.tagName === 'HTML' || el.tagName === 'BODY') return
  let {top: rectTop, right} = el.getBoundingClientRect()
  let top = findPosY(el)
  let absoluteElement = createAbsoluteNode(count, top || rectTop, right)
  document.body.append(absoluteElement)
}

export function createAbsoluteNode(text, top, right){
  let element = document.createElement('div')
  element.textContent = text
  element.className = 'click-times-pop'
  element.style.top = `${top}px`
  element.style.left = `${right - 30}px`
  return element
}

function getElIndex(parent, child) {
  return Array.prototype.indexOf.call(parent.children, child)
}

function findPosY (node) {
  let top = 0
  if (node.offsetParent) {
    do {
      top += node.offsetTop
    } while (node = node.offsetParent)
    return top
  }
}