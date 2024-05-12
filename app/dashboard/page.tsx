"use client"

import Auth from "@/components/Auth";
import Home from "@/components/Dashboard";
import { MyDashboard } from "@/components/component/dashboard";
import userAtom from "@/src/atoms/userAtom";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";

const Dashboard = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  useLayoutEffect(() => {
    // Check if user is an empty object and redirect to "/" route if true
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      router.push("/");
    }
  }, [user]);

  console.log(user);

  return <MyDashboard />;
};

export default Dashboard;
