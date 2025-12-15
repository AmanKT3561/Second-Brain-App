import { Button } from "../componenents/Buttons";
import { Input } from "../componenents/ui/Input";

export function Signup() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-2xl border min-w-48 p-8">
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <div className="justify-center flex pt-4">
        <Button Loading = {false} text="Sign Up" variant="Primary" size="md" Fullwidth={true} />
        </div>
      </div>
    </div>
  );
}
