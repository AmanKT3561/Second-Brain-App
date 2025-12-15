import React from "react";

export function SidebarItem ({text , icon} : {text : string , icon : React.ReactElement}) {
    return (
        <div className="flex text-gray-800 py-2 gap-3 cursor-pointer hover:bg-gray-100 rounded max-w-48 pl-4">
        <div className = "">
          {icon}   
        </div>
        <div className="">
          {text}
        </div>
        </div>
    )
}