import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useContext, useState } from 'react';
import { UserContext, UserState } from '../utils/context';
import "../css/LoginPage.css"
import { LoginForm } from "./forms/login-from"
import { RegisterForm } from "./forms/register-form"
import UserService from "@/api/UserService";

function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useContext<UserState>(UserContext)

  const login = async (username: string, password: string) => {
    await UserService.login(username, password).then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          setError(text)
        })
      }
      else {
        setUser(UserService.getSession())
      }
    })
  }

  const register = async (name: string, username: string, password: string) => {
    await UserService.register(name, username, password).then(res => {
      if (!res.ok) {
        res.text().then(text => {
          setError(text)
        })
      }
      else {
        setUser(UserService.getSession())
      }
    })
  }

  const registerSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })

  const loginSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })

  function onSubmitRegister(values: z.infer<typeof registerSchema>) {
    register(values.name, values.username, values.password)
  }

  function onSubmitLogin(values: z.infer<typeof loginSchema>) {
    login(values.username, values.password)
  }

  if (error) {
    window.alert(error)
    setError(null)
  }

  return (
    <div className="login-page h-full w-full">
      {isLogin
        ?
        <LoginForm onSubmitLogin={onSubmitLogin} loginSchema={loginSchema} />
        :
        <RegisterForm onSubmitRegister={onSubmitRegister} registerSchema={registerSchema} />
      }

      <div className="login-page__form-change">
        <span>
          {isLogin ? "Don't have account? " : "Already have account? "}
        </span>

        <Button variant="link" onClick={() => { setIsLogin(!isLogin) }}>
          {isLogin ? "Register now" : "Login now"}
        </Button>
      </div>
      
    </div>
  );
}

export default LoginPage;