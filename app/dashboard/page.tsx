"use client";
import Auth from "@/components/Auth";
import Home from "@/components/Dashboard";
import userAtom from "@/src/atoms/userAtom";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";

const Dashboard = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  useLayoutEffect(() => {
    if (!user) router.push("/");
  }, []);
  return <div>Dashbaord</div>;
};

export default Dashboard;
