import "../css/LoginPage.css"
import { useContext, useState } from 'react';
import UserService from "../api/UserService";
import { UserContext, UserState } from "../utils/context";

function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      {isLogin
        ?
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground pb-3">
            Enter your username and password to login to your account
          </p>
        </div>
        :
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
          Create a new account
          </h1>
          <p className="text-sm text-muted-foreground pb-3">
          Enter the details below to create your account
          </p>
        </div>
      }

      <div className="login-page__form">
        <form onSubmit={
          (event) => { isLogin ? login(event) : register(event) }
        }>
          <div className="form__group">
            <div className="mt-4">
              <div className="relative">
                <input
                  type="input"
                  name="name"
                  placeholder="name"
                  style={{ display: isLogin ? "none" : "block" }}
                  className='bg-gray-800 w-full py-2.5 px-4 border text-sm' />
              </div>
            </div>

            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                  className='bg-gray-800 w-full py-2.5 px-4 border text-sm' />
              </div>
            </div>

            <div className="mt-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  required
                  className='bg-gray-800 w-full py-2.5 px-4 border text-sm' />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"
                      style={{ fill: "rgba(0, 0, 0, 1)", transform: "msFilter" }}>
                      <path d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              className='ms-4 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:ring-offset-2 transition ease-in-out duration-150'
              type="submit"
            >
              {isLogin ? "login" : "register"}
            </button>
          </div>

          <div className="flex items-center justify-end mt-4">
            <a className="text-sm text-gray-200">
              {isLogin ? "Don't have account?" : "Already have account?"}
            </a>

            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin) }}
              className='ms-4 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:ring-offset-2 transition ease-in-out duration-150'>
              {isLogin ? "Register now" : "Login now"}
            </button>
          </div>

        </form>
      </div >
    </div >
  );
}

export default LoginPage;
