import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "../../interfaces/userInterface";
import { cookies } from "next/headers";

const handler =  NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: 
            {
                email: {label: "Email", type: "email", placeholder: "example@gmail.com"},
                password: {label: "Password", type: "password"}
            },

            async authorize(credentials:Record<"email" | "password", string> | undefined):Promise<IUser | null>{
                const {email,password} = credentials || {}
                console.log(email,password)

                const userLogin = await login(email!,password!);
                const {user,token} = userLogin;
                if(!user) return null;
                return {
                    ...user,
                    token
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            const cookieStore = cookies();
            if(user){
                token.name = user.name!;
                token.email = user.email!;
                token.tokenBack = user.token!;
                token.tokenFrontend = cookieStore.get("next-auth.session-token")?.value as string;
                console.log("tokenback", token.tokenBack)
            }
            
            return token
        },

        async session({session, token}){
            const tokens = {
                tokenBack: token.tokenBack,
                tokenFrontend: token.tokenFrontend
            }
            console.log(tokens, "test back")
            return {
                ...session,
                user: {
                    ...session.user,
                    tokens
                }
            }
        }
    },
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

export {handler as GET, handler as POST}