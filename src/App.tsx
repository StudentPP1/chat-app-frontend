import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router";
import LoginPage from "./components/auth/LoginPage";
import ChatPage from "./components/chat/ChatPage";
import { UserContext } from "./utils/context";
import { useEffect, useState } from "react";
import { ChatUser } from "./model/ChatUser";
import UserService from "./api/UserService";
import { ToastContainer } from "react-toastify";

// 1.
// password: 1r;0F3Dw1EO[
// login: test

// 2.
// password: 1r;0F3Dw1EO0
// login: user

function App() {
  const [user, setUser] = useState<ChatUser | null>(null);

  const getSession = async () => {
    await UserService.getSession().then((result) => { setUser(result) })
  }

  useEffect(() => {
    try {
      getSession()
    }
    catch (error) {
      console.log(error)
      setUser(null)
    }
  }, []);

  return (
    <div className="app">
      <ToastContainer theme="dark" style={{ zIndex: 1000 }} />
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <ChatPage /> : <LoginPage />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
            <Route path="/chat" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
