import {createBrowserRouter} from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import SignIn from "../pages/SignIn";

export const route = createBrowserRouter([
  {
    path : "/",
    element : <SignIn/>,
    index: true
  },
  {
    path : "/chat",
    element: <ChatPage/>
  }
])