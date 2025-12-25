import { Button } from "../componenents/Buttons";
import { Input } from "../componenents/ui/Input";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signin() {
    const Username = usernameRef.current?.value;
    const Password = passwordRef.current?.value;
     const response =  await axios.post(`http://localhost:3000/api/v1/signin`, {
        username: Username,
        password: Password
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert("Signin Successful");
      navigate("/dashboard");
    } 
 
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-2xl border min-w-48 p-8">
        <Input Reference={usernameRef} placeholder="Username" />
        <Input Reference={passwordRef} placeholder="Password" />
        <div className="justify-center flex pt-4">
        <Button onClick = {signin} Loading = {false} text="Sign In" variant="Primary" size="md" Fullwidth={true} />
        </div>
      </div>
    </div>
  );
}
export default Signin;
