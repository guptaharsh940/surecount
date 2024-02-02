'use client';
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useCallback, useState } from "react";
import bgImage from "../../../../public/surecount.jpg";
import logo from "../../../../public/logo-surecount.png";
import Image from "next/image";
import { redirect } from "next/navigation";
const SignIn: NextPage = (props): JSX.Element => {
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        // validate your userinfo
        e.preventDefault();
        const res = await signIn("credentials", {
            username: userInfo.username,
            password: userInfo.password,

        }

        );

    };
    // style= 
    return (

        <div className="flex justify-center items-center w-full min-h-screen" style={{ backgroundImage: `url(${bgImage.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            {/* <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                value={userInfo.username}
                onChange={({ target }) =>
                        setUserInfo({ ...userInfo, username: target.value })
                    }
                    type="username"
                    placeholder="john"
                    />
                    <input
                    value={userInfo.password}
                    onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password: target.value })
                }
                    type="password"
                    placeholder="********"
                    />
                    <input className="text-black hover:text-gray-300 on" type="submit" value="Login" />
                </form> */}
            <form onSubmit={handleSubmit}>

                <div className="min-h-80 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1 shadow-xl rounded-xl bg-white">
                    <div className="sm:col-span-4 p-10">
                        <div className="text-center">

                            <Image src={logo} alt="Surecount" className="w-44 mx-auto"></Image>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input value={userInfo.username} onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })} type="username" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 min-w-60 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="username" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} type="password" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 min-w-60 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="********" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input className=" min-w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" value="Login" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;