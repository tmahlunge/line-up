import {UserData, UserDataErrorResponseBody} from "./types/types";

export enum RestRequestStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INITIAL = 'INITIAL',
    PENDING = 'PENDING'
}

interface RestRequestSuccessful {
    state: RestRequestStatus.SUCCESS
}

interface RestRequestError extends UserDataErrorResponseBody {
    state: RestRequestStatus.ERROR
}

interface RestRequestPending {
    state: RestRequestStatus.PENDING
}

interface RestRequestInitial {
    state: RestRequestStatus.INITIAL
}

export enum AUTHORISATION_LEVEL {
    ADMIN = 'ADMIN',
    BASIC = 'BASIC'
}

export type RestRequestState = RestRequestInitial| RestRequestPending | RestRequestError | RestRequestSuccessful;

export interface State {
    userMap: { [userId: number]: UserData },
    auth: {
        authorisationLevel: AUTHORISATION_LEVEL
    },
    restRequestState: RestRequestState;
}

interface ComplexState extends State {
    featureA: {
        nestedStateA: {
            innerNestedStateA: number
            innerNestedStateB: number
        },
        nestedStateB: {
            innerNestedStateA: number
            innerNestedStateB: number
        }
    },
    featureB: {
        nestedStateA: {
            innerNestedStateA: number
            innerNestedStateB: number
        },
        nestedStateB: {
            innerNestedStateA: number
            innerNestedStateB: number
        }
    }
}