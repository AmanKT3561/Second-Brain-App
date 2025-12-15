import { TwitterIcon } from "./ui/icons/TwitterIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";
import { SidebarItem } from "./ui/SidebarItem";
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