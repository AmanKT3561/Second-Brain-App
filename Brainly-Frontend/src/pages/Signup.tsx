import { useState } from "react";
import { Button } from "../componenents/Buttons";
import { Input } from "../componenents/ui/Input";
import axios from "axios";
import { backendURL } from "../backendURL";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signup() {
    if (!username.trim() || !password.trim()) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      await axios.post(`${backendURL}signup`, {
        username,
        password,
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
      <div className="bg-white rounded-2xl border min-w-72 p-8 shadow-md">
        
        <Input
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          placeholder="Username"
        />

        <Input
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          type="password"
        />

        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            Loading={false}
            text="Sign Up"
            variant="Primary"
            size="md"
            Fullwidth={true}
          />
        </div>

        <div className="flex justify-center pt-2">
          <Button
            onClick={() => navigate("/signin")}
            Loading={false}
            text="Already a user? Sign In"
            variant="Secondary"
            size="md"
            Fullwidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
