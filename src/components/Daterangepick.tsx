"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { addDays, subDays, format } from "date-fns"
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
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux';
import { calendar } from '@/redux/features/calendar-slice';

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {

    const date = useAppSelector((state)=> state.calendarReducer.value)
    // const [date, setDate] = useState<DateRange | undefined>({
    //     from: new Date(),
    //     // to: addDays(new Date(), 20),
    // })
    // const handleSelectToday = () => {
    //     console.log("Today option clicked");
    //     // ... rest of the logic
    // };
    const dispatch = useDispatch();
    const setDate = (e:any)=>{
        dispatch(calendar.actions.changeDate(e));
    }
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
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(e) => setDate(e)}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
