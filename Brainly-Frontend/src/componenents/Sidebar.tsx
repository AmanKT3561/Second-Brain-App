import { useState } from 'react'
import { Logo } from "./ui/icons/logo";
import { TwitterIcon } from "./ui/icons/TwitterIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";
import { SidebarItem } from "./ui/SidebarItem";

export function Sidebar () {
    const [active, setActive] = useState<'all'|'twitter'|'youtube'>('all')

    function handleFilter(filter: 'all'|'twitter'|'youtube'){
        setActive(filter)
        window.dispatchEvent(new CustomEvent('filter:content', { detail: filter }))
    }

    return (
        <div className="h-screen bg-white border-r w-72 position-fixed top-0 left-0 absolute pl-6">
            <div className="flex text-2xl text-gray-800 font-bold pt-4 item-center">
                <div className = "pr-4">
                    <Logo />
                </div>
                Second-Brain
            </div>
                     <div className = "pt-4 pl-4 text-gray-800 item-center space-y-2 ">
                             <div onClick={() => handleFilter('all')}>
                                 <SidebarItem text = "All" icon={
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                         <path d="M3 5a1 1 0 011-1h3a1 1 0 110 2H5v3a1 1 0 11-2 0V5zM11 4h3a1 1 0 110 2h-2v2a1 1 0 11-2 0V4zM4 11a1 1 0 011-1h2a1 1 0 110 2H6v2a1 1 0 11-2 0v-3zm12-1a1 1 0 00-1-1h-2a1 1 0 100 2h1v2a1 1 0 102 0v-3z" />
                                     </svg>
                                 } active={active === 'all'} />
                             </div>
                             <div onClick={() => handleFilter('twitter')}>
                                 <SidebarItem text = "Twitter" icon = {<TwitterIcon />} active={active === 'twitter'} />
                             </div>
                             <div onClick={() => handleFilter('youtube')}>
                                 <SidebarItem text = "Youtube" icon = {<YoutubeIcon />} active={active === 'youtube'} />
                             </div>
                     </div>
        </div>
    )
}