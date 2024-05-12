"use client";

import userAtom from "@/src/atoms/userAtom";
import { teacherURL } from "@/src/utils/constants";
import { TSignup } from "@/src/utils/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export function Signup() {
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const [inputs, setInputs] = useState<TSignup>({
    email: "",
    username: "",
    password: "",
  });
  const handleSignup = async (e: any) => {
    e.preventDefault();
    console.log(inputs);
    const response = await axios.post(`${teacherURL}/signup`, inputs, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    localStorage.setItem("user-info", JSON.stringify(response.data.teacher));
    setUser(response.data.teacher);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link className="flex items-center justify-center" href="#">
            <CalendarIcon className="h-8 w-8" />
            <span className="ml-2 text-2xl font-bold">Attendance System</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign up
          </h2>
        </div>
        <form action="#" className="space-y-6" method="POST">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="name"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                autoComplete="name"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                type="text"
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                autoComplete="email"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                type="email"
                onChange={(e) => {
                  setInputs({ ...inputs, email: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                autoComplete="current-password"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                type="password"
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:text-gray-950 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-950"
              type="submit"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              href="/login"
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
