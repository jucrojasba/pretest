import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "../../interfaces/userInterface";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: 
            {
                email: {label: "Email", type: "email", placeholder: "example@gmail.com"},
                password: {label: "Password", type: "password"}
            },

            async authorize(credentials:Record<"email" | "password", string> | any):Promise<null | User >{
                const {email,password} = credentials || {}
                const userLogin = await login(email,password);
                const {user,token} = userLogin;
                if(!user)return null;
                return user;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
});

async function login(email:string, password: string){
    try{
        const response = await fetch("https://simuate-test-backend-1.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        });
        if(!response.ok) throw new Error("Error with the response");
        console.log(response);
        return await response.json();
    }catch(error:unknown){
        console.log("Error with the login")
    }; 
}