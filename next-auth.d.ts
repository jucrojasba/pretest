import NextAuth, {DefaultSession}  from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User{
        token:string
    }
    interface Session{
        user: {
            name:string,
            email:string,
            tokenBack:string,
            tokenFrontend:string,
            email:string,
        }
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        tokenBack: string,
        tokenFrontend: string,
        name:string,
        email:string
    }
}