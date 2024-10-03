"use client";
import { FormLogin } from "@/components"
import React from "react";
import SelectLanguage from "@/components/UI/SelectLanguage/SelectLanguage";
export default function LoginView():React.ReactElement{
  return(
    <main>
      <SelectLanguage />
      <FormLogin />
    </main>
  )
}