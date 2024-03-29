"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDownload, faMinus, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

import React, { useState } from "react"
import { Filterforform } from "../Filter"

const checkboxSchema = z.object({
    label: z.string(),
    value: z.string(),
    checked: z.boolean(),
});

const formSchema = z.object({
    reportName: z.string().min(2, {
        message: "Report Name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    widget: z.array(checkboxSchema).refine(data => data.some(widget => widget.checked), {
        message: "Atleast one must be selected",
    }),
    date: z.date().min(new Date(), {
        message: "Select a future date",
    }),
})

export function ReportForm() {
    const [expand, setexpand] = useState(false);

    const [date, setDate] = React.useState<Date>()
    // ...
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reportName: "",
            email: "",
            widget: [],
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Card className='h-full w-full hover:shadow-xl'>
            <CardHeader className="relative">
                <CardTitle>
                    Create Report
                </CardTitle>
                <button className="absolute right-8 hover:text-blue-500" onClick={() => setexpand(!expand)}>
                    {expand ? (<FontAwesomeIcon icon={faMinus} />) : (<FontAwesomeIcon icon={faPlus} />)}
                </button>
            </CardHeader>
            {expand && <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="reportName"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <div className="w-full"> */}
                                    <div className="w-full flex ">
                                        <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                            <FormLabel className="p-3">User Name</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="border-b flex-1 flex">
                                                <Input className="m-3 w-full" placeholder="User Name" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                    {/* </div> */}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <div className="w-full"> */}
                                    <div className="w-full flex ">
                                        <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                            <FormLabel className="p-3">Email</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="border-b flex-1 flex">
                                                <Input className="m-3 w-full" placeholder="Email Address" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                    {/* </div> */}
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex ">
                            <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                <p className="p-4">Add Levels to User</p>
                            </div>
                            <div className="p-5 space-y-2 border-b flex-1 flex">

                                <Filterforform />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="widget"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="w-full flex ">
                                        <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">

                                            <FormLabel className="p-3">Add Widgets To Report</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <div className="border-b flex-1 flex">
                                                    <Checkbox
                                                        id="daily"
                                                        {...field}
                                                        value="daily"
                                                    />
                                                    <label
                                                        htmlFor="Weekly"
                                                        className="m-3 w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Daily
                                                    </label>
                                                </div>
                                                <Checkbox id="Weekly" />
                                                <label
                                                    htmlFor="Weekly"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Weekly
                                                </label>
                                                <Checkbox id="Monthly" />
                                                <label
                                                    htmlFor="Monthly"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Monthly
                                                </label>
                                                <Checkbox id="Yearly" />
                                                <label
                                                    htmlFor="Yearly"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Yearly
                                                </label>
                                                <Checkbox id="Footfall By Region" />
                                                <label
                                                    htmlFor="Footfall By Region"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Footfall By Region
                                                </label>
                                                <Checkbox id="No of Stores By Region" />
                                                <label
                                                    htmlFor="No of Stores By Region"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    No of Stores By Region
                                                </label>
                                                <Checkbox id="Footfall - Region by Day of Week" />
                                                <label
                                                    htmlFor="Footfall - Region by Day of Week"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Footfall - Region by Day of Week
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <div>


                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal",
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>}
        </Card>
    )
}
