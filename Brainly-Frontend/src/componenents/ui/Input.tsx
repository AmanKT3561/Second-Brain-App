export function Input({Reference , placeholder, type = 'text'}:{Reference?:any, placeholder?:string, type?:string})
{
    return(
        <div>
            <input ref = {Reference} placeholder = {placeholder} type = {type} className = "px-4 py-2 border rounded m-2"  ></input>
        </div>
    )
}