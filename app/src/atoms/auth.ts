import { atom } from "recoil";

const authScreenAtom = atom({
  key: "authScreenAtom",
  default: "logout",
});

export default authScreenAtom;
