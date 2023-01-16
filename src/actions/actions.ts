import { createAction } from '@reduxjs/toolkit'
import {UserDataErrorResponseBody, UserDataFromServer} from "../types/types";
import {AUTHORISATION_LEVEL} from "../state";

export const userDataRequestSuccessful = createAction('USER_DATA_REQUEST_SUCCESSFUL', (userDataFromServer: UserDataFromServer) => ({
        payload: {
            userDataFromServer
        }
}));

export const userDataRequestError = createAction('USER_DATA_REQUEST_ERROR', (userDataErrorResponseBody: UserDataErrorResponseBody) => ({
  payload: {
    userDataErrorResponseBody
  }
}));

export const userDataRequestPending = createAction('USER_DATA_REQUEST_PENDING', () => ({
  payload: {}
}));

export const setAuthorisationLevel = createAction('SET_AUTHORISATION_LEVEL', (authorisationLevel: AUTHORISATION_LEVEL) => ({
  payload: {
    authorisationLevel
  }
}));