import { configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth-slices'
import calendarReducer from './features/calendar-slice'
import footfallReducer from './features/footfall-slices'
import filterReducer from './features/filter-slices'
import { useSelector, TypedUseSelectorHook } from 'react-redux';
export const store = configureStore({
    reducer:{
        authReducer, calendarReducer,footfallReducer, filterReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;