import { TwitterIcon } from "./ui/icons/TwitterIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";
import React, { ReactNode } from "react";

type SidebarItemProps = {
    text: string;
    icon: ReactNode;
};

function SidebarItem({ text, icon }: SidebarItemProps) {
    return (
        <button className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded">
            {icon}
            <span>{text}</span>
        </button>
    );
}
export function Sidebar () {
    return (
        <div className="h-screen bg-white border-r w-72 position-fixed top-0 left-0 z-50 absolute">
           <div className = "pt-4 pl-4">
               <SidebarItem text = "Twitter" icon = {<TwitterIcon />} />
               <SidebarItem text = "Youtube" icon = {<YoutubeIcon />} />
               
           </div>
        </div>
    )
}