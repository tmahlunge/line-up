import React from 'react';
import {Link, useParams} from "react-router-dom";
import {UserDataErrorResponseBody} from "../../types/types";
import loadingSpinner from "../../images/loading.png"
import useCachedUserData from "./hooks/useCachedUserData";
import useIsAdmin from "./hooks/useIsAdmin";
import {useSelector} from "react-redux";
import {RestRequestStatus, State} from "../../state";
import useUserDataRequest from "./hooks/useUserDataRequest";

const DataDisplay: React.FC = () => {
  const { userId } = useParams();
  const { userData } = useCachedUserData(userId);
  const { isAdmin } = useIsAdmin()

  return userData ? <>
    <div className="title">{`User data for user with id: ${userId}`}</div>
    { isAdmin && <div className="data-element">{`First name: ${userData.firstName}`}</div> }
    { isAdmin && <div className="data-element">{`Last name: ${userData.lastName}`}</div> }
    { isAdmin && <div className="data-element">{`Email: ${userData.email}`}</div> }
    <img src={userData.avatar} className="avatar" aria-label="avatar" alt="avatar"/>
  </> : null;
}

type ErrorDisplayProps = UserDataErrorResponseBody;
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({status, statusText}) => {
  const {userId} = useParams();

  return <>
    <div className="title">{`Error getting data for user with id: ${userId}`}</div>
    <div className="data-element">{`Status: ${status}`}</div>
    <div className="data-element">{`Status text: ${statusText}`}</div>
  </>
}

/**
 * This component will leverage the useUserDataRequest upon load to pull in the userId path parameter to
 * make a request to the Python server for the user data corresponding to the userId in the path.
 *
 * If no errors are encountered, data is displaed in the <DataDisplay/> component
 * If 404 or 500 errors (etc.) occur while the GET request for user data, the messages are displayed
 * in the <ErrorDisplay/> component.
 *
 * See useUserDataRequest for further details on error handling.
 */
const UserDataDisplayPage: React.FC = () => {
  const restRequestState = useSelector((state: State) => state.restRequestState);
  const loading = restRequestState.state === RestRequestStatus.PENDING;
  const errorResponse = restRequestState.state === RestRequestStatus.ERROR ? {
    status: restRequestState.status,
    statusText: restRequestState.statusText
  } : undefined;

  useUserDataRequest();

  return (
    <div className="user-data-display-form">
      {loading &&
				<img src={loadingSpinner} className="loading-spinner" aria-label="loading-spinner" alt="loading-spinner"/>}
      {!loading &&
				<>
          {errorResponse && <ErrorDisplay {...errorResponse} />}
          {!errorResponse && <DataDisplay/>}
					<Link to="/">
						Back
					</Link>
				</>
      }
    </div>

  );
}

export default UserDataDisplayPage;
