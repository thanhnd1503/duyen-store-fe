import { atom } from "recoil";

export const userRecoil = atom<User>({
  key: "user",
  default: {
    id: "1",
    name: "Duyen",
  },
});

interface User {
  id: string;
  name: string;
}
