// 第一种写起来很麻烦 需要一个个创建
// class UserCard extends HTMLElement {
//   constructor() {
//     super()

//     let image = document.createElement('img')
//     image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png'
//     image.classList.add('image')

//     let container = document.createElement('div')
//     container.classList.add('container')

//     let name = document.createElement('p')
//     name.classList.add('name')
//     name.innerText = 'User Name'

//     let email = document.createElement('p')
//     email.classList.add('email')
//     email.innerText = 'email@some-email.com'

//     let button = document.createElement('button')
//     button.classList.add('button')
//     button.innerText = 'Fllow'

//     container.append(name, email, button)

//     this.append(image, container)
//   }
// }
// 第二种 可以直接引用template组件内的内容
class UserCard extends HTMLElement {
  constructor() {
    super()
    let shadow = this.attachShadow({ mode: 'closed' })
    const templateEle = document.querySelector('#userCardTemplate')
    const content = templateEle.content.cloneNode(true)

    content.querySelector('img').setAttribute('src', this.getAttribute('image'))
    content.querySelector('.container>.name').innerText = this.getAttribute('name')
    content.querySelector('.container>.email').innerText = this.getAttribute('email')

    shadow.appendChild(content)
  }
}

window.customElements.define('user-card', UserCard)