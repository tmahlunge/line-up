import { createAction } from '@reduxjs/toolkit'
import { UserDataFromServer } from "../types/types";

export const cacheUserData = createAction('CACHE_USER_DATA', (userDataFromServer: UserDataFromServer) => ({
        payload: {
            userDataFromServer
        }
}));