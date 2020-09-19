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
  // console.log(validStyle)
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
    imgNode.parentNode.style.outline = '1px solid red'
    img = null
  })
}

export function checkHasStyleNode(node) {
  let { width, height } = node.style
  const { width: realWidth, height: realHeight } = window.getComputedStyle(node)
  if(width && height) {
    if(width !== realWidth || height !== realHeight){
      node.style.outline = '1px solid red'
    }
  }else if(!width){
    if(height !== realHeight){
      node.style.outline = '1px solid red'
    }
  }else{
    if(width !== realWidth){
      node.style.outline = '1px solid red'
    }
  }
}