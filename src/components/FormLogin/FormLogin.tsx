"use client"
import GroupInput from "../UI/GroupInput/GroupInput";
import Button from "../UI/Button/Button";
import { IFormDataLogin } from "@/interfaces/formDataInterface";
import { useState } from "react";
import { useTranslations } from "next-intl";
export default function FormLogin():React.ReactElement{
    const traduction = useTranslations("LoginView");
    const initialFormData: IFormDataLogin = {
        email: "",
        password: ""
    };
    const [formData, setFormData] = useState<IFormDataLogin>(initialFormData);
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
            <GroupInput label={traduction("email")} type="email" onChange={(e)=>handleChange(e)} name="email" value={formData.email} />
            <GroupInput label={traduction("password")} type="password" onChange={(e)=>handleChange(e)} name="password" value={formData.password} />
            <Button label={traduction("buttonLogin")} onClick={(e)=>handleLogin(e)} />
        </form>
    )
}