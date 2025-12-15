import React from "react";

export function SidebarItem ({text , icon} : {text : string , icon : React.ReactElement}) {
    return (
        <div className="flex">
        <div className = "p-2">
          {icon}   
        </div>
        <div className="p-2">
          {text}
        </div>
        </div>
    )
}