import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import { UserContext } from "./utils/context";
import { useEffect, useState } from "react";
import { ChatUser } from "./model/ChatUser";

function App() {
  const [user, setUser] = useState<ChatUser | null>(null);

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
      setUser(json)
    }
    else {
      setUser(null)
    }
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
