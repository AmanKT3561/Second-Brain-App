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
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareLink" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
