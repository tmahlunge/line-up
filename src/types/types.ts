export interface UserDataFromServer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserData extends Pick <UserDataFromServer, 'id' | 'email' | 'avatar'> {
    firstName: string;
    lastName: string;
}

export interface UserDataResponseBody {
    data: UserDataFromServer;
    support: {
        url: string;
        text: string;
    }
}

export interface UserDataErrorResponseBody {
    status: number;
    statusText: string;
}

export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>
