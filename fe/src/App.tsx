import "./App.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="h-screen bg-black ">
      <div className="flex justify-center h-full items-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
