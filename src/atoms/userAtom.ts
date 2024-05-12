import { atom } from "recoil";

let defaultUserThreads;
if (typeof window !== "undefined") {
  defaultUserThreads = localStorage.getItem("user-threads") || "{}";
} else {
  defaultUserThreads = "{}"; // Or any other default value you want to assign
}

const userAtom = atom({
  key: "userAtom",
  default: "",
});

export default userAtom;
