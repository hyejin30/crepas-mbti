import { atom } from "recoil";
import { v1 } from "uuid";

export const stepState = atom({
  key: `stepState/${v1()}`,
  default: 0,
});

export const typeState = atom({
  key: `typeState/${v1()}`,
  default: "",
});
