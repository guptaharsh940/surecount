import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer'
enableMapSet();

type user={
    clientId: number;
    regionId: number;
    level3Id: number;
    level2Id: number;
    installId: number;
}
type InitialState = {
    userClients:Array<user>;

};


const initialState: InitialState = {
    userClients:[]
};

export const filter = createSlice({
    name: "filter",
    initialState,
    reducers: {
        
        removestore: (state, action: PayloadAction<user>) => {
            // console.log(action.payload, "from here")
            state.userClients = state.userClients.filter((e)=>(e!==action.payload))
        },
        addstore: (state, action: PayloadAction<user>) => {
            // console.log(action.payload, "from here")
            state.userClients.push(action.payload)
        },

    }
});

export const {
    removestore,
    addstore
} = filter.actions;
export default filter.reducer;
