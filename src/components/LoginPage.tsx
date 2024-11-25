import { useContext, useState } from 'react';
import "../scss/LoginPage.css"
import { UserContext, UserState } from '../utils/context';

function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const {user, setUser} = useContext<UserState>(UserContext)

  const login = async (event: any) => {
    console.log("login")
    event.preventDefault()
    const username = event.target['username'].value;
    const password = event.target['password'].value;

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
    }).then(async () => {getSession()})
  }

  const register = async (event: any) => {
    console.log("register")
    event.preventDefault()
    const name = event.target['name'].value;
    const username = event.target['username'].value;
    const password = event.target['password'].value;

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
    }).then(async () => {getSession()})
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
      setUser(json)
    }
  }

  return (
    <div className="login-page">
      <div className="login-page__form">
        <form onSubmit={
          (event) => { isLogin ? login(event) : register(event) }
        }>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              name="name" id='name' 
              style={{ display: isLogin ? "none" : "block" }}
            />
            <label
              className="form__label"
              style={{ display: isLogin ? "none" : "block" }}
            >
              name
            </label>
          </div>

          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              name="username" id='username' required
            />
            <label className="form__label">username</label>
          </div>

          <div className="form__group field">
            <input
              type="password"
              className="form__field"
              name="password" id='password' required
            />
            <label className="form__label">password</label>
          </div>

          <div className='login-page__form-submit-button'>
            <button type="submit">
              {isLogin ? "login" : "register"}
            </button>
          </div>

          <div className='login-page__form-change-button'>
            <button type="button" onClick={() => { setIsLogin(!isLogin) }}>
              {isLogin ? "Don't have account? Register now" : "Already have account? Login now"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
