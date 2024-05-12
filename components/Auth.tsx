"use client";
import { Login } from "@/components/component/login";
import { Signup } from "@/components/component/signup";
import authScreenAtom from "@/src/atoms/auth";
import { useRecoilValue } from "recoil";

const Auth = () => {
  const authState = useRecoilValue(authScreenAtom);
  return <div>{authState === "login" ? <Login /> : <Signup />}</div>;
};

export default Auth;
