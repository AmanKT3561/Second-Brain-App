export function SidebarItem ({text , icon} : {text : string , icon : React.ReactElement}) {
    return (
        <div>
          {icon} {text}  
        </div>
    )
}