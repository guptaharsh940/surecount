import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            storeId: string;
            regionId: number;
            clientId: string;
            userId: number;
            userType: string;
            isAuthenticated: boolean;
            user:{isAdmin:boolean};
            username: string;
        }
    }
}
