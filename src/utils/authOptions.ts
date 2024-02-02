import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { redirect } from "next/navigation";


type UserData = {
    storeId: string;
    regionId: number;
    clientId: string;
    userId: number;
    userType: string;
    isAuthenticated: boolean;
    username: string;
}
// const dispatch = useDispatch<AppDispatch>()
let userData: UserData;
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials || !credentials.password || !credentials.username) {
                        // Returning null will trigger an error displayed to the user.
                        return null;
                    }
                    // let data;
                    const response = await fetch(process.env.NEXT_PUBLIC_APIURL + "/admin/user/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "userName": credentials.username as string, "password": credentials.password as string })
                    });
                    userData = await response.json();

                    userData.username = credentials.username
                    if (response.ok && userData) {
                        // console.log("Authenticated", data.storeId, data.regionId, data.clientId, data.userId, data.username);
                        // dispatch(logIn(data))
                        // store.dispatch(auth.actions.logIn(data))
                        console.log(JSON.stringify(userData))
                        return userData;
                    } else {
                        // Returning null will trigger an error displayed to the user.
                        console.log("Not auth")
                        return null;
                    }
                } catch (error) {
                    console.error('An error occurred during authentication:', error);
                    // Throwing an error will redirect the user to the error page with the error message.
                    throw new Error('Authentication failed');
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            
            return baseUrl
        },
        async session({ session, user }) {
            // Include user data in the session
            console.log("user-", userData);
            console.log("user2-", user);
            session.user = userData;
            console.log(session);
            return session;
        },
        // async jwt({ token, user }) {
        //     if (user) token.role = user.role;
        //     return token;
        // },
        // async session({ session, token }) {
        //     if (session?.user) session.user.role = token.role;
        //     return session;
        // },
        // async jwt({ token, account }) {
        //     // Persist the OAuth access_token and or the user id to the token right after signin
        //     if (account) {
        //         token.accessToken = account.access_token
        //         token.id = account.id
        //     }
        //     return token
        // },
        // async session({ session, token }) {
        //     // Send properties to the client, like an access_token and user id from a provider.
        //     session.accessToken = token.accessToken
        //     session.user.id = token.id

        //     return session
        // }
    }
};
