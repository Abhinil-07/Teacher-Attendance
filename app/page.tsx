"use client";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import authScreenAtom from "./src/atoms/auth";

export default function Home() {
  const data = useRecoilValue(authScreenAtom);
  return (
    <div>
      <h1>Home</h1>
      <p>{data}</p>
    </div>
  );
}
