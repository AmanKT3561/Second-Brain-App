import { useState } from "react"
import { CrossIcon } from "./icons/CrossIcon"
import { Button } from "../Buttons"
import { Input } from "./Input"
export function CreateContentModal ({open , onClose})
{
const [Modalopen , setModalopen] = useState(false)
return (
    <div>
      {open && <div className = "w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 justify-center flex">
         <div className = "flex flex-col justify-center">
            <span className = " bg-white rounded-md shadow-lg p-4 w-full max-w-sm opacity-100 flex flex-col">
             {/* crossIcon    */}
            <div className = "flex justify-end">
                <div onClick = {onClose} className = "cursor-pointer">
                <CrossIcon/>
                </div>
            </div>
             {/* ...... */}
           {/* Input Boxes */}
            <div>
               <Input placeholder = {"Title"}  />
               <Input placeholder = {"Link"} />
            </div>
            {/* ...... */}
            <div className="flex justify-center">
            <Button variant = "Primary" text = "Submit" size = "sm" />
            </div>
            </span>
         </div>
               </div>    
      }
    </div>
)
}


