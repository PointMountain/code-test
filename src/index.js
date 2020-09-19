import { getAllValidElements, getRealHeight, findAbnormalImage, checkHasStyleNode } from './dom'
const validElements = getAllValidElements()
validElements.forEach(element => {
  if(element.tagName === 'IMG') {
    findAbnormalImage(element)
  } else if(element.style.height || element.style.width){
    checkHasStyleNode(element)
  }
})