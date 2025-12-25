import { useState } from "react";
import { CrossIcon } from "./icons/CrossIcon";
import { Button } from "../Buttons";
import { Input } from "./Input";
import { useRef } from "react";
import axios from "axios";

const contentType = {
  youtube: "youtube",
  twitter: "twitter",
} as const;
export function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const tittleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(contentType.youtube);
  async function addContent() {
    const tittle = tittleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(`http://localhost:3000/api/v1/content`, {
      title: tittle,
      link: link,
      type: type
    },{
      headers: {
         Authorization:localStorage.getItem("token")
    }
  })

   

  }
  return (
    <div>
      {open && (
         <div>
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 justify-center flex">

        </div>

          <div className="fixed top-0 left-0 w-screen h-screen  justify-center flex">
          <div className="flex flex-col justify-center">
            <span className=" bg-white rounded-md shadow-lg p-4 w-full max-w-sm opacity-100 flex flex-col">
              {/* crossIcon    */}
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              {/* ...... */}
              {/* Input Boxes */}
              <div>
                <Input Reference={tittleRef} placeholder={"Title"} />
                <Input Reference={linkRef} placeholder={"Link"} />
              </div>

              {/* type box */}
               <h1>Select Type</h1>
               <div className="flex gap-2 p-4 justify-center pb-4">
              <Button
                text="Youtube"
                variant={type === contentType.youtube ? "Primary" : "Secondary"}
                size="md"
                onClick={() => {
                  setType(contentType.youtube);
                }}
              ></Button>
              <Button
                text="Twitter"
                variant={type === contentType.twitter ? "Primary" : "Secondary"}
                size = "md"
                onClick={() => {
                  setType(contentType.twitter);
                }}
              ></Button>
              </div>

              {/* type box */}

              {/* ...... */}
              <div className="flex justify-center">
                <Button
                  onClick={addContent}
                  variant="Primary"
                  text="Submit"
                  size="sm"
                />
              </div>
            </span>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
