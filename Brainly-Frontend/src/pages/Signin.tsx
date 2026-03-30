import { Button } from "../componenents/Buttons";
import { Input } from "../componenents/ui/Input";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "../backendURL";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signin() {
    if (!username.trim() || !password.trim()) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendURL}signin`, {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      // Keep axios default header in sync for the current session
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      alert("Signin Successful");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signin error", err);
      const msg = err?.response?.data?.message || "Signin failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-2xl border min-w-48 p-8">
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
        <div className="justify-center flex pt-4">
          <Button
            onClick={signin}
            Loading={loading}
            text="Sign In"
            variant="Primary"
            size="md"
            Fullwidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
