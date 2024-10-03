"use client"
import GroupInput from "../UI/GroupInput/GroupInput";
import Button from "../UI/Button/Button";
import { IFormData } from "@/interfaces/FormDataInterface";
import { useState } from "react";
export default function FormLogin():React.ReactElement{
    const initialFormData: IFormData = {
        name: "",
        email: "",
        password: ""
    };
    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const handleLogin = (e:React.FormEvent):void =>{
        e.preventDefault();
        console.log("Login")
    };
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        const {name,value} = e.target;
    }
    return(
        <form>
            <GroupInput label="Name" type="name" onChange={(e)=>handleChange(e)} name="name" value={formData.name} />
            <GroupInput label="Email" type="email" onChange={(e)=>handleChange(e)} name="email" value={formData.email} />
            <GroupInput label="Password" type="password" onChange={(e)=>handleChange(e)} name="password" value={formData.password} />
            <Button label="Login" onClick={(e)=>handleLogin(e)} />
        </form>
    )
}