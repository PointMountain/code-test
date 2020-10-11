let xhr = new XMLHttpRequest
xhr.open('GET', 'http://127.0.0.1/users.json', true)
xhr.onreadystatechange - function () {
  if(xhr.status === 200 && xhr.readyState === 4) {
    console.log(xhr.responseText)
  }
}
xhr.send()