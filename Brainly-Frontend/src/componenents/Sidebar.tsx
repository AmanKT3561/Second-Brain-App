import { Logo } from "./ui/icons/logo";
import { TwitterIcon } from "./ui/icons/TwitterIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";
import { SidebarItem } from "./ui/SidebarItem";
export function Sidebar () {
    return (
        <div className="h-screen bg-white border-r w-72 position-fixed top-0 left-0 absolute pl-6">
            <div className="flex text-2xl text-gray-800 font-bold pt-4 item-center">
                <div className = "pr-4">
                    <Logo />
                </div>
                Second-Brain
            </div>
           <div className = "pt-4 pl-4 text-gray-800 item-center ">
               <SidebarItem text = "Twitter" icon = {<TwitterIcon />} />
               <SidebarItem text = "Youtube" icon = {<YoutubeIcon />} />  
           </div>
        </div>
    )
}