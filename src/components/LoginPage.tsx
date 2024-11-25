import { useContext, useState } from 'react';
import "../scss/LoginPage.css"
import { UserContext, UserState } from '../utils/context';

function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { user, setUser } = useContext<UserState>(UserContext)

  const login = async (event: any) => {
    console.log("login")
    event.preventDefault()
    const username = event.target['username'].value;
    const password = event.target['password'].value;

    if (username == "" || password == "") {
      setError("fields should not be empty")
    }
    else {
      await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password }),
      }).then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            setError(text)
          })
        }
        else {
          getSession()
        }
      })
    }
  }

  const register = async (event: any) => {
    console.log("register")
    event.preventDefault()
    const name = event.target['name'].value;
    const username = event.target['username'].value;
    const password = event.target['password'].value;
    if (username == "" || password == "" || name == "") {
      setError("fields should not be empty")
    }
    else {
      await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
        body: JSON.stringify({ name: name, username: username, password: password }),
      }).then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            setError(text)
          })
        }
        else {
          getSession()
        }
      })
    }
  }

  const getSession = async () => {
    const result = await fetch("http://localhost:8080/auth/getSession", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include"
    })
    if (result.ok) {
      const json = await result.json();
      console.log(json);
      setError(null)
      setUser(json)
    }
  }

  if (error) {
    window.alert(error)
    setError(null)
  }

  return (
    <div className="login-page">
      <div className="login-page__form">
        <form onSubmit={
          (event) => { isLogin ? login(event) : register(event) }
        }>
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="name" name="name" id='name'
              style={{ display: isLogin ? "none" : "block" }} />
            <label
              className="form__label"
              style={{ display: isLogin ? "none" : "block" }}>name</label>
          </div>

          <div className="form__group field">
            <input 
            type="text" 
            className="form__field" 
            placeholder="username" name="username" id='username' required />
            <label className="form__label">username</label>
          </div>

          <div className="form__group field">
            <input 
            type={showPassword ? "text" : "password" }
            className="form__field" 
            placeholder="password" name="password" id='password' required />
            <label className="form__label">password</label>
            <div className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "hide" : "show" }
            </div>
          </div>

          <div className='login-page__form-submit-button'>
            <button type="submit" className='form-submit-button'>
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

          <div className='login-page__form-change-button'>
            <span>
            {isLogin ? "Don't have account? " : "Already have account? "}
            </span>
            <a className='change-button' type="button" onClick={() => { setIsLogin(!isLogin) }}>
              {isLogin ? "Register now" : "Login now"}
            </a>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
