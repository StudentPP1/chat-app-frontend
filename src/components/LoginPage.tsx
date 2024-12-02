import "../css/LoginPage.css"
import { useContext, useState } from 'react';
import { UserContext, UserState } from '../utils/context';
import UserService from "../api/UserService";

function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useContext<UserState>(UserContext)

  const login = async (event: any) => {
    event.preventDefault()
    const username = event.target['username'].value;
    const password = event.target['password'].value;

    await UserService.login(username, password).then(async res => {
      if (!res.ok) {
        return res.text().then(text => {
          setError(text)
        })
      }
      else {
        setUser(await UserService.getSession())
      }
    })
  }

  const register = async (event: any) => {
    event.preventDefault()
    const name = event.target['name'].value;
    const username = event.target['username'].value;
    const password = event.target['password'].value;

    await UserService.register(name, username, password).then(async res => {
      if (!res.ok) {
        res.text().then(text => {
          setError(text)
        })
      }
      else {
        setUser(await UserService.getSession())
      }
    })
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
