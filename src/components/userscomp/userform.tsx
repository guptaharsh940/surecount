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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faL, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Filterforform } from "../Filter"
import { saveUserData } from "@/api/getusersdata"

const checkboxSchema = z.object({
    label: z.string(),
    value: z.string(),
    checked: z.boolean(),
});

// ... (existing imports remain unchanged)

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    profileName: z.string().min(2, {
        message: "Profile name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }),
    confirmPassword: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }),
}).refine(
    (data) => {
        return data.password === data.confirmPassword;
    },
    {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
);

export type userperm = {
    addUser: boolean,
    deleteUser: boolean,
    addReport: boolean,
    deleteReport: boolean
}

export function UserForm() {
    const [date, setDate] = React.useState<Date>();
    const [expand, setexpand] = useState(false);
    const [applicationId, setapplicationId] = useState(1);
    const [userpermission, setuserpermission] = useState<userperm>({ addUser: false, deleteUser: false, addReport: true, deleteReport: true })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            profileName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        saveUserData(values,userpermission,applicationId)
        console.log(values);
    }

    return (
        <Card className='h-full w-full hover:shadow-xl'>
            <CardHeader className="relative">
                <CardTitle>Create User</CardTitle>
                <button className="absolute right-8 hover:text-blue-500" onClick={() => setexpand(!expand)}>
                    {expand ? (<FontAwesomeIcon icon={faMinus} />) : (<FontAwesomeIcon icon={faPlus} />)}
                </button>
            </CardHeader>
            {expand && <CardContent className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">



                        <FormField
                            control={form.control}
                            name="username"
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
                            name="profileName"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <div className="w-full"> */}
                                    <div className="w-full flex ">
                                        <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                            <FormLabel className="p-3">Profile Name</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="border-b flex-1 flex">
                                                <Input className="m-3 w-full" placeholder="Profile Name" {...field} />
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
                            name="profileName"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <div className="w-full"> */}
                                    <div className="w-full flex ">
                                        <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                            <FormLabel className="p-3">Profile Name</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="border-b flex-1 flex">
                                                <Input className="m-3 w-full" placeholder="Profile Name" {...field} />
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <div className="w-full"> */}
                                    <div className="w-full flex ">
                                        <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                            <FormLabel className="p-3">Password</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="border-b flex-1 flex">
                                                <Input className="m-3 w-full" type="password" placeholder="Password" {...field} />
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
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <div className="w-full"> */}
                                    <div className="w-full flex ">
                                        <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                            <FormLabel className="p-3">Confirm Password</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="border-b flex-1 flex">
                                                <Input className="m-3 w-full" type="password" placeholder="Confirm Password" {...field} />
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
                        <div className="w-full flex ">
                            <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                <p className="p-4">Select Template</p>
                            </div>
                            <div className="p-5 space-y-2 border-b flex-1 flex flex-col">
                                <div className="flex">

                                    <Checkbox id={"1"} checked={applicationId === 1} onCheckedChange={(e) => (setapplicationId(e ? 1 : 1))} />
                                    <label
                                        htmlFor={"1"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Admin Template
                                    </label>
                                </div>
                                <div className="flex">
                                    <Checkbox id={"2"} checked={applicationId === 2} onCheckedChange={(e) => (setapplicationId(e ? 2 : 2))} />
                                    <label
                                        htmlFor={"2"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        GM Template
                                    </label>
                                </div>
                                <div className="flex">
                                    <Checkbox id={"3"} checked={applicationId === 3} onCheckedChange={(e) => (setapplicationId(e ? 3 : 3))} />
                                    <label
                                        htmlFor={"3"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Store Template
                                    </label>
                                </div>
                                <div className="flex">
                                    <Checkbox id={"4"} checked={applicationId === 4} onCheckedChange={(e) => (setapplicationId(e ? 4 : 4))} />
                                    <label
                                        htmlFor={"4"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Management Template (Mobile App Only)
                                    </label>
                                </div>
                                <div className="flex">
                                    <Checkbox id={"5"} checked={applicationId === 5} onCheckedChange={(e) => (setapplicationId(e ? 5 : 5))} />
                                    <label
                                        htmlFor={"5"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        RM Template
                                    </label>
                                </div>
                                <div className="flex">
                                    <Checkbox id={"6"} checked={applicationId === 6} onCheckedChange={(e) => (setapplicationId(e ? 6 : 6))} />
                                    <label
                                        htmlFor={"6"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        DM Template
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex ">
                            <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                <p className="p-4">User Access</p>
                            </div>
                            <div className="p-5 space-y-2 border-b flex-1 flex">
                                <div className="flex-1 flex">

                                    <Checkbox id={"group"} checked={false} />
                                    <label
                                        htmlFor={"group"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Group User
                                    </label>
                                </div>
                                <div className="flex-1 flex">
                                    <Checkbox id={"normal"} checked={true} />
                                    <label
                                        htmlFor={"normal"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Normal User
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex ">
                            <div className="border-r border-b flex-none w-1/4 flex items-center justify-end">
                                <p className="p-4">Permission</p>
                            </div>
                            <div className="p-5 space-y-2 border-b flex-1 flex">
                                <div className="flex-1 flex">

                                    <Checkbox id={"addrep"} checked={userpermission.addReport} onCheckedChange={(e) => (setuserpermission({ ...userpermission, addReport :e?true:false}))}/>
                                    <label
                                        htmlFor={"addrep"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Add Report
                                    </label>
                                </div>
                                <div className="flex-1 flex">
                                    <Checkbox id={"delrep"} checked={userpermission.deleteReport} onCheckedChange={(e) => (setuserpermission({ ...userpermission, deleteReport :e?true:false}))} />
                                    <label
                                        htmlFor={"delrep"}
                                        className="pl-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Delete Report
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Remaining code for widgets and date */}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>}
        </Card>
    );
}
