import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { addDays, subDays, format } from "date-fns"
type InitialState ={
    value: CalendarState;
}
type CalendarState={
    from: Date,
    to: Date | undefined,
}
const today = new Date()
const initialState = {
    value:{
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date()
    } as CalendarState,
} as InitialState


export const calendar = createSlice({
    name:"calendar",
    initialState,
    reducers:{
        changeDate:(state, action: PayloadAction<CalendarState>)=>{
            // console.log(action.payload, "from here")
            return{
                value:{
                    from: action.payload.from,
                    to: action.payload.to? action.payload.to : undefined,
                }
            }
        },

    }
})

export const { changeDate } = calendar.actions;
export default calendar.reducer;