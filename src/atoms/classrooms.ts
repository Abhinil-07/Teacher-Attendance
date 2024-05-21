import { atom } from "recoil";
interface Classroom {
  code: string;
  name: string;
}

const classroomsAtom = atom<Classroom[]>({
  key: "classroomsAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default classroomsAtom;
