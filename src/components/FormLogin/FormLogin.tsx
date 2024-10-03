"use client"
import GroupInput from "../UI/GroupInput/GroupInput";
import Button from "../UI/Button/Button";
import { IFormData } from "@/interfaces/FormDataInterface";
import { useState } from "react";
import { useTranslations } from "next-intl";
export default function FormLogin():React.ReactElement{
    const traduction = useTranslations("LoginView");
    const initialFormData: IFormData = {
        email: "",
        password: ""
    };
    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const handleLogin = (e:React.FormEvent):void =>{
        e.preventDefault();
        console.log(formData)
    };
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }
    return(
        <form>
            <h2>{traduction("title")}</h2>
            <GroupInput label="Email" type="email" onChange={(e)=>handleChange(e)} name="email" value={formData.email} />
            <GroupInput label="Password" type="password" onChange={(e)=>handleChange(e)} name="password" value={formData.password} />
            <Button label="Login" onClick={(e)=>handleLogin(e)} />
        </form>
    )
}