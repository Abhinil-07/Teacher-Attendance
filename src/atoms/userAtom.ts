import { atom } from "recoil";

let defaultUserThreads;
if (typeof window !== "undefined") {
  // Check if localStorage has the item
  const storedData = localStorage.getItem("user-info");
  defaultUserThreads = storedData ? storedData : "{}"; // Use "{}" as default if localStorage is empty
} else {
  defaultUserThreads = "{}"; // Assign valid JSON string as default value
}

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(defaultUserThreads),
});

export default userAtom;