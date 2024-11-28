import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import { UserContext } from "./utils/context";
import { useEffect, useState } from "react";
import { ChatUser } from "./model/ChatUser";
import { ThemeProvider } from "./utils/theme-provider";
import UserService from "./api/UserService";

function App() {
  const [user, setUser] = useState<ChatUser | null>(null);

  const getSession = async () => {
    setUser(await UserService.getSession())
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
    <div className="app h-full w-full">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={user ? <LoginPage /> : <ChatPage />} />
              {/* <Route path="/" element={user ? <ChatPage /> : <LoginPage />} /> */}
              <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
              <Route path="/chat" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
