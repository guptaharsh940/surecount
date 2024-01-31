import {createSlice, PayloadAction} from "@reduxjs/toolkit";
type InitialState ={
    value: footfallType;
}
type footfallType = {
    time:string;
    count:number;
    row:number;
}

const initialState = {
    value:{
        time:"hourly",
        count:1,
        row:10,

    }as footfallType
} as InitialState


export const footfall = createSlice({
    name:"footfall",
    initialState,
    reducers:{
        changeFootfall:(state, action: PayloadAction<string>)=>{
            state.value.time = action.payload
        },
        incrementCount:(state)=>{
            state.value.count += 1
        },
        decrementCount:(state)=>{
            state.value.count -= 1
        },
        changeRow:(state, action: PayloadAction<number>)=>{
            state.value.row = action.payload
        },

    }
})

export const { changeFootfall, incrementCount, decrementCount, changeRow } = footfall.actions;
export default footfall.reducer;