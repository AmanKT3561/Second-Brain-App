import React from "react";

export function SidebarItem ({text , icon, active = false} : {text : string , icon?: React.ReactElement, active?: boolean}) {
    const base = "flex items-center gap-3 py-2 px-3 rounded max-w-48 cursor-pointer"
    const activeClasses = active ? "bg-purple-50 text-purple-700 font-semibold shadow-sm" : "text-gray-800 hover:bg-gray-100"
    return (
        <div className={`${base} ${activeClasses}`}>
          <div className = "w-6 h-6 flex items-center justify-center text-gray-500">
            {icon ?? <span className="w-2 h-2 rounded-full bg-gray-300" />}
          </div>
          <div className="text-sm">
            {text}
          </div>
        </div>
    )
}