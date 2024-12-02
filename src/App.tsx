import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import { UserContext } from "./utils/context";
import { useEffect, useState } from "react";
import { ChatUser } from "./model/ChatUser";
import UserService from "./api/UserService";

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
  }, [])

  return (
    <div className="app">
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <ChatPage /> : <LoginPage />} />
            <Route path="/login" element={user ? <Navigate to="/" replace />  : <LoginPage />} />
            <Route path="/chat" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
