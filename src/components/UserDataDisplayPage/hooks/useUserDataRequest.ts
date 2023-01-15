import {useCallback, useEffect, useState} from 'react';
import * as actions from "../../../actions/actions";
import useAction from "../../../hooks/useAction";
import {UserDataErrorResponseBody, UserDataResponseBody} from "../../../types/types";
import {useParams} from "react-router-dom";
import useCachedUserData from "./useCachedUserData";

const pythonServerBaseUrl = 'http://localhost:8000';
const getUserIdUrl = `${pythonServerBaseUrl}/api/users`;

/**
 * This hook just pulls the userId out of the path and creates a get request on mount (or on userId change) and will
 * store the data in the redux store when the request is successful.
 *
 * When standard request errors like 404, 500 etc. occur, this component will return the data in the errorResponse variable.
 * The reason, I'm returning this in a variable instead of storing it in state is to avoid creating a section of state
 * designed for monitoring REST request with enum INITIAL, PENDING, ERROR, SUCCESSFUL and holding the error messages and
 * clearing them down. This would be simple but excessive for one request!
 *
 * We do, however return a loading variable for when data is being loaded to display the spinner. All permutations of the
 * code in this file are fully tested in the UserDataDisplayPage.spec.ts file, I simply extracted this hook to its own
 * file to be a bit more readable!
 *
 * I could, however, have tested the hook in isolation using renderHook(() => useUserDataRequest()), but this would involve
 * basically setting up a test component that would amount to the components within <UserDataDisplayPage />!
 *
 * Non-standard errors that aren't like 404, 500 etc. will be caught and logged and the <UserDataDisplayPage /> will just
 * display a back button. For example: load the <UserDataRequestForm /> (i.e. open app on root url), enter a userId, then
 * turn off Network (throttle to being offline) and press submit. You'll see error logged and just a Back button.
 */
const useUserDataRequest = () => {
    const { userId } = useParams();
    const userData = useCachedUserData(userId);
    const cacheUserData = useAction(actions.cacheUserData);

    const [errorResponse, setErrorResponse] = useState<UserDataErrorResponseBody | undefined>();
    const [loading, setLoading] = useState(true);

    const requestUserData = useCallback(async () => {
        const url = `${getUserIdUrl}/${userId}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const { statusText, status } = response;
                setErrorResponse({ statusText, status })
            } else {
                const result: UserDataResponseBody = await response.json();
                cacheUserData(result.data)
            }
        } catch (error) {
            console.error(`Caught unexpected error during GET request to ${url}`, error);
        }
    }, [userId, cacheUserData, setErrorResponse])

    useEffect(() => {
        if (!userData) {
            requestUserData().then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [userData, userId, requestUserData]);

    return { errorResponse, loading }
};

export default useUserDataRequest;