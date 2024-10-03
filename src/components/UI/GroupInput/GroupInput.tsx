import React from "react"
import Input from "../Input/Input"
interface GroupInputProps{
    label:string,
    type:string
}
export default function GroupInput({label,type}: GroupInputProps):React.ReactElement{
    return(
        <div>
            <label>{label}</label>
            <Input type={type} />
        </div>
    )
}