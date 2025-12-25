import { useRef } from "react";
import { Button } from "../componenents/Buttons";
import { Input } from "../componenents/ui/Input";
import { backendURL } from "../backendURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup() {
    const Username = usernameRef.current?.value;
    const Password = passwordRef.current?.value;
    try {
      await axios.post(`http://localhost:3000/api/v1/signup`, {
        username: Username,
        password: Password
      });
      alert("Signup Successful");
      navigate("/signin");
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err?.response?.data?.message || "Signup failed");
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-2xl border min-w-48 p-8">
        <Input Reference={usernameRef} placeholder="Username" />
        <Input Reference={passwordRef} placeholder="Password" type="password" />
        <div className="justify-center flex pt-4">
          <Button
            onClick={signup}
            Loading={false}
            text="Sign Up"
            variant="Primary"
            size="md"
            Fullwidth={true}
          />
        </div>
      </div>
    </div>
  );
}
export default Signup;
