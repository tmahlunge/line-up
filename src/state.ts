import { UserData } from "./types/types";

export interface State {
    userMap: { [userId: number]: UserData }
}