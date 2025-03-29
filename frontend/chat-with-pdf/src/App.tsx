
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import AiQuestionAnswer from "./pages/aichat";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
function App() {

  return (
    <>
     <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/chat" element={<AiQuestionAnswer/>}/>
      <Route path ="/login" element={<LoginPage/>}/>
      <Route path ="/signup" element={<SignupPage/>}/>
     </Routes>
      
    </>
  )
}

export default App
