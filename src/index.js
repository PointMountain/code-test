// 筛选添加是否可以直接通过display: none来实现
// 可以通过基础样式来检测dom和实际内容是否相同！ 问题是获取不到高度 想办法！！ 通过fixed脱离文档流 然后visibility: hidden; 设置吗？？ 性能消耗
// const styles = ['color', 'backgroundColor', 'height', 'width', 'fontSize', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft']
// function  getAllNode() {
//   let elements = document.body.getElementsByTagName('*')
//   let validNode = []
//   let validNodeStyle = []
//   for (let index = 0; index < elements.length; index++) {
//     const element = elements[index]
//     let newElement = document.createElement(element.tagName)
//     newElement.textContent = element.textContent
//     const cssStyle = window.getComputedStyle(element)
//     if(cssStyle.display !== 'none'){
//       validNode.push(element)
//       const validStyle = styles.reduce((acc, current) => {
//         newElement.style[current] = cssStyle[current]
//         acc[current] = cssStyle[current]
//         return acc
//       }, {})
//       validNodeStyle.push(validStyle)
//     }
//     console.log(newElement)
//     // document.documentElement.appendChild(newElement)
//     console.log(window.getComputedStyle(element).height)
//     console.log(newElement.getBoundingClientRect())
//     // const cssStyle = window.getComputedStyle(element)
//     // allNodeStyled.push(cssStyle)
//   }
//   return {validNode, validNodeStyle}
// }
// getAllNode()

import { getAllValidElements, getRealHeight, findAbnormalImage, checkHasStyleNode } from './dom'
const validElements = getAllValidElements()
validElements.forEach(element => {
  if(element.tagName === 'IMG') {
    findAbnormalImage(element)
  } else if(element.style.height || element.style.width){
    checkHasStyleNode(element)
  }
  // const currentHeight = window.getComputedStyle(element).height
  // const realHeight = getRealHeight(element)
  // if(currentHeight !== 'auto'){
  //   if(realHeight !== currentHeight){
  //     // console.log(realHeight, currentHeight)
  //     // element.style.outline = '1px solid red'
  //   }
  // }
})