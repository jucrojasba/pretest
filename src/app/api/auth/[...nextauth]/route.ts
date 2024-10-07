import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "../../interfaces/userInterface";
import { cookies } from "next/headers";

// Función de login que realiza la petición al backend
async function login(email: string, password: string) {
    try {
        const response = await fetch("https://simuate-test-backend-1.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Verifica si la respuesta no es OK
        if (!response.ok) {
            throw new Error(`Failed to login, status code: ${response.status}`);
        }

        const data = await response.json();
        console.log("Login response:", data);  // Verifica la respuesta del backend
        return data;  // Se espera que el backend devuelva el user y el token
    } catch (error) {
        console.error("Error with the login:", error);
        return null;  // Devuelve null si ocurre algún error
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" },
            },

            // Función authorize que valida las credenciales del usuario
            async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<IUser | null> {
                const { email, password } = credentials || {};

                // Verifica que se hayan proporcionado credenciales
                if (!email || !password) return null;

                try {
                    const userLogin = await login(email, password);
                    const { user, token } = userLogin || {};  // Verifica que userLogin esté correctamente formado
                    
                    // Si no hay usuario o token, devuelve null
                    if (!user || !token) {
                        return null;
                    }

                    return { ...user, token };  // Devuelve el usuario junto con el token
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        // Callback JWT: manejar los tokens del usuario y añadir más información
        async jwt({ token, user }) {
            const cookieStore = cookies();  // Obtiene las cookies disponibles

            if (user) {
                // Si el usuario existe, agrega información al token
                token.name = user.name!;
                token.email = user.email!;
                token.tokenBack = user.token!;

                // Obtiene el token de frontend desde las cookies
                const sessionCookie = cookieStore.get("next-auth.session-token");
                if (sessionCookie) {
                    token.tokenFrontend = sessionCookie.value;
                }

                console.log("tokenBack:", token.tokenBack);
                console.log("tokenFrontend:", token.tokenFrontend);
            }

            return token;  // Devuelve el token modificado
        },

        // Callback de session para incluir tokens en la sesión
        async session({ session, token }) {
            const tokens = {
                tokenBack: token.tokenBack,
                tokenFrontend: token.tokenFrontend,
            };
            console.log("Session tokens:", tokens);  // Depuración para ver los tokens en la sesión

            return {
                ...session,
                user: {
                    ...session.user,
                    tokens,  // Añade los tokens al objeto user en la sesión
                },
            };
        },
    },

    secret: process.env.NEXTAUTH_SECRET,  // Asegúrate de tener esta variable de entorno configurada
});

// Exporta el handler como GET y POST
export { handler as GET, handler as POST };
