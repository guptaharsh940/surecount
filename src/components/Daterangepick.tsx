"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { addDays, subDays, format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, subYears } from "date-fns"
import { DateRange } from "react-day-picker"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { store, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux';
import { calendar } from '@/redux/features/calendar-slice';

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [showCal, setshowCal] = useState(false);
    const [option, setOption] = useState("today");
    let date = useAppSelector((state) => state.calendarReducer.value)
    // const [date, setDate] = useState<DateRange | undefined>({
    //     from: new Date(),
    //     // to: addDays(new Date(), 20),
    // })
    // const handleSelectToday = () => {
    //     console.log("Today option clicked");
    //     // ... rest of the logic
    // };
    // React.useEffect(()=>{
    //     date = store.getState().calendarReducer.value
    // }, [option])
    const dispatch = useDispatch();
    const setDate = (e: any) => {
        dispatch(calendar.actions.changeDate(e));
    }
    const changeDate = (input: string) => {
        const today = new Date();
        switch (input) {
            case 'today':
                dispatch(calendar.actions.changeDate({ from: today, to: undefined }));
                setOption('today');
                setshowCal(false)
                break;
            case 'yesterday':
                dispatch(calendar.actions.changeDate({ from: subDays(today, 1), to: undefined }));
                setOption('yesterday');
                setshowCal(false)
                break;
            case 'Last 7 Days':
                dispatch(calendar.actions.changeDate({ from: subDays(today, 7), to: today }));
                setOption('Last 7 Days');
                setshowCal(false)
                break;
            case 'Last 14 Days':
                dispatch(calendar.actions.changeDate({ from: subDays(today, 14), to: today }));
                setOption('Last 14 Days');
                setshowCal(false)
                break;
            case 'Last 30 Days':
                dispatch(calendar.actions.changeDate({ from: subDays(today, 30), to: today }));
                setOption('Last 30 Days');
                setshowCal(false)
                break;
            case 'This Month':
                dispatch(calendar.actions.changeDate({ from: startOfMonth(today), to: today }));
                setOption('This Month');
                setshowCal(false)
                break;
            case 'Last Month':
                const firstDayOfLastMonth = startOfMonth(subMonths(today, 1));
                const lastDayOfLastMonth = endOfMonth(subMonths(today, 1));
                dispatch(calendar.actions.changeDate({ from: firstDayOfLastMonth, to: lastDayOfLastMonth }));
                setOption('Last Month');
                setshowCal(false)
                break;
            case 'This Year':
                dispatch(calendar.actions.changeDate({ from: startOfYear(today), to: today }));
                setOption('This Year');
                setshowCal(false)
                break;
            case 'Custom':
                setshowCal(!showCal)
                setOption('Custom');
                break;
            case 'Last Year':
                const firstDayOfLastYear = startOfYear(subYears(today, 1));
                const lastDayOfLastYear = endOfYear(subYears(today, 1));
                dispatch(calendar.actions.changeDate({ from: firstDayOfLastYear, to: lastDayOfLastYear }));
                setOption('Last Year');
                setshowCal(false)
                break;
            default:
                console.error("Select Option");
                break;
        }
    };
    return (
        <div className={cn("grid gap-2", className)}>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-fit justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" min-w-80 w-auto p-0" align="start">
                    <ul className="px-4 py-3">
                        <li onClick={() => changeDate('today')} className={option === 'today' ? 'font-bold' : ''}>
                            <button>Today</button>
                        </li>
                        <li onClick={() => changeDate('yesterday')} className={option === 'yesterday' ? 'font-bold' : ''}>
                            <button>Yesterday</button>
                        </li>
                        <li onClick={() => changeDate('Last 7 Days')} className={option === 'Last 7 Days' ? 'font-bold' : ''}>
                            <button>Last 7 Days</button>
                        </li>
                        <li onClick={() => changeDate('Last 14 Days')} className={option === 'Last 14 Days' ? 'font-bold' : ''}>
                            <button>Last 14 Days</button>
                        </li>
                        <li onClick={() => changeDate('Last 30 Days')} className={option === 'Last 30 Days' ? 'font-bold' : ''}>
                            <button>Last 30 Days</button>
                        </li>
                        <li onClick={() => changeDate('This Month')} className={option === 'This Month' ? 'font-bold' : ''}>
                            <button>This Month</button>
                        </li>
                        <li onClick={() => changeDate('Last Month')} className={option === 'Last Month' ? 'font-bold' : ''}>
                            <button>Last Month</button>
                        </li>
                        <li onClick={() => changeDate('This Year')} className={option === 'This Year' ? 'font-bold' : ''}>
                            <button>This Year</button>
                        </li>
                        <li onClick={() => changeDate('Last Year')} className={option === 'Last Year' ? 'font-bold' : ''}>
                            <button>Last Year</button>
                        </li>
                        <button><li onClick={() => (changeDate('Custom'))} className={option === 'Custom' ? 'font-bold' : ''}>Custom</li></button>
                    </ul>
                    {showCal ? (<Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(e) => setDate(e)}
                        numberOfMonths={2}
                    />) : (<></>)}
                </PopoverContent>
            </Popover>
        </div>
    )
}
