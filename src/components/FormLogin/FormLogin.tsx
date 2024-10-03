"use client"
import React from "react"
import GroupInput from "../UI/GroupInput/GroupInput";
export default function FormLogin():React.ReactElement{
    return(
        <form>
            <GroupInput label="Email" type="email" />
            <GroupInput label="Password" type="password" />
        </form>
    )
}