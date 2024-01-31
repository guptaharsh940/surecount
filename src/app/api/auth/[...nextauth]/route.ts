import NextAuth from "next-auth/next"
import { authOptions } from "@/utils/authOptions";
// import { logIn, logOut } from "@/redux/features/auth-slices";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { store } from "@/redux/store";
// import { auth } from "@/redux/features/auth-slices";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// export { data };
