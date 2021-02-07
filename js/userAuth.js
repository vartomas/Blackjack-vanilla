// register user
const register = () => {
    let name = document.querySelector('#register-name').value
    let email = document.querySelector('#register-email').value
    let password = document.querySelector('#register-password').value
    let repeatPassword = document.querySelector('#repeat-password').value
    let error = document.querySelector('.display-error')
    error.innerText = ''
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (name.length < 2)
      error.innerText += 'NAME MUST BE AT LEAST 2 CHARACTERS LONG, '
    if (!emailRegex.test(String(email).toLowerCase()))
      error.innerText += 'PLEASE ENTER VALID E-MAIL, '
    if (password.length < 8)
      error.innerText += 'PASSWORD MUST BE AT LEAST 8 CHARACTERS LONG, '
    if (password !== repeatPassword)
      error.innerText += 'PASSWORDS DOES NOT MATCH. '
    if (error.innerText !== '') {
      u.displayNone(error)
      return (error.innerText =
        error.innerText.substring(0, error.innerText.length - 1) + '.')
    }
    document.querySelector('#sign-up-submit').innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`
    fetch('https://stormy-woodland-40432.herokuapp.com/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        document.querySelector('#sign-up-submit').innerHTML = `SUCCESS`
        setTimeout(() => {
          u.toggleHidden(
            document.querySelector('.register-form'),
            document.querySelector('.loginForm')
          )
        }, 1000)
        setTimeout(() => {
          document.querySelector('#register-name').value = ''
          document.querySelector('#register-email').value = ''
          document.querySelector('#register-password').value = ''
          document.querySelector('#repeat-password').value = ''
          document.querySelector('#sign-up-submit').innerHTML = `REGISTER`
        }, 1500)
      })
      .catch(err => {
        u.displayBlock(error)
        error.innerText = 'E-MAIL ALREADY EXISTS IN OUR DATABASE'
    })
}

// login
const login = () => {
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value
    const loginErrorOutput = document.querySelector('.login-error')
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    loginErrorOutput.style.display = 'none'
    if (!emailRegex.test(String(email).toLowerCase())) {
      u.displayBlock(loginErrorOutput)
      loginErrorOutput.innerText = 'INVALID E-MAIL'
      return
    }
    if (password.length < 8) {
      u.displayBlock(loginErrorOutput)
      loginErrorOutput.innerText = 'INVALID PASSWORD'
      return
    }
  
    fetch('https://stormy-woodland-40432.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        u.updateLocal('user', {
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token,
        })
      })
      .catch(err => {
        console.log(err)
        u.displayBlock(loginErrorOutput)
        loginErrorOutput.innerText = 'WRONG PASSWORD'
    })
}

export { register, login }