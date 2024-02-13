import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState ={
    value: AuthState;
}
type AuthState={
    storeId: string;
    regionId: number;
    clientId: string;
    userId: number;
    userType: string;
    isAuthenticated:boolean;
    user:{isAdmin:boolean};
    username:string;
}
const initialState = {
    value:{
        storeId: "",
        regionId: 0,
        clientId: "",
        userId: 0,
        userType: "",
        isAuthenticated:false,
        user:{isAdmin:false},
        username:"none",
    } as AuthState,
} as InitialState


export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logIn:(state, action: PayloadAction<AuthState>)=>{
            // console.log(action.payload, "from here")
            return{
                value:{
                    storeId: action.payload.storeId,
                    regionId:action.payload.regionId,
                    clientId:action.payload.clientId,
                    userId:action.payload.userId,
                    userType:action.payload.userType,
                    isAuthenticated:action.payload.isAuthenticated,
                    user:action.payload.user,
                    username:action.payload.username
                }
            }
        },
        logOut:()=>{
            console.log("loggedout from state")
            return initialState;
        }

    }
})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;