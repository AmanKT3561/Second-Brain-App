import type { ReactElement } from "react";
import type React from "react"; 
import { MouseEventHandler } from "react";

export interface buttonProps {
    variant: "Primary" | "Secondary" ,
    size?: "sm" | "md" | "lg",
    text : string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    Fullwidth?: boolean,
    Loading?: boolean

}

const Variantstyles = {
    "Primary" : "bg-purple-600 text-white",
    "Secondary" : "bg-purple-300 text-purple-600"
}
const sizeStyles = {
  "sm": "py-1 px-2",
  "md": "py-2 px-3",
  "lg": "py-4 px-6",
};

const defaultStyles = "rounded-md flex font-light flex"
export const Button = (props: buttonProps) => {
  return (
    <button onClick = {props.onClick} className={`${Variantstyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles} + ${props.Fullwidth ? " w-full flex justify-center items-center" : ""} ${props.Loading ? "opacity-45" : ""} `} disabled = {props.Loading}>
      {props.startIcon ? <div className="pr-2 , items-center"> {props.startIcon} </div> :null } {props.text} {props.endIcon ? <div className="pr-2 , items-center"> {props.endIcon} </div> :null }
    </button>
  );
};


