import  Dashboard  from "./pages/Dashboard";
import  Signup  from "./pages/Signup";
import  Signin  from "./pages/Signin";
import SharePage from "./pages/Share";
import { BrowserRouter, Routes, Route }  from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/share/:shareLink" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
