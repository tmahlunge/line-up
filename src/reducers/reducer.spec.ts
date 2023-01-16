import {AUTHORISATION_LEVEL, RestRequestStatus, State} from "../state";
import reducer from "./reducer";
import {
  setAuthorisationLevel,
  userDataRequestError,
  userDataRequestPending,
  userDataRequestSuccessful
} from "../actions/actions";
import {UserDataFromServer} from "../types/types";
import createUserDataFromServer from "../testing/data/createUserDataFromServer";

describe('reducer tests', () => {
  const initialState: State = {
    userMap: {},
    restRequestState: {
      state: RestRequestStatus.INITIAL
    },
    auth: {
      authorisationLevel: AUTHORISATION_LEVEL.ADMIN
    }
  };

  const userDataFromServer: UserDataFromServer = createUserDataFromServer({ id: 0 })

  it('will add data to userMap and set restRequestState successful on userDataRequestSuccessful', () => {
    const newState = reducer(initialState, userDataRequestSuccessful(userDataFromServer))
    expect(newState.userMap[0]).toEqual({
      avatar: 'http://hire-tad.com/images/good-developer.png',
      firstName: 'Tad',
      lastName: 'Mahlunge',
      email: 'tadiwamahlunge@gmail.com',
      id: 0
    });

    expect(newState.restRequestState).toEqual({
      state: RestRequestStatus.SUCCESS
    });
  });

  it('set the restRequestState errored on userDataRequestError', () => {
    const newState = reducer(initialState, userDataRequestError({ status: 404, statusText: 'Not Found'}))
    expect(newState.restRequestState).toEqual({
      state: RestRequestStatus.ERROR,
      status: 404,
      statusText: 'Not Found'
    });
  });

  it('set the restRequestState pending on userDataRequestPending', () => {
    const newState = reducer(initialState, userDataRequestPending())
    expect(newState.restRequestState).toEqual({
      state: RestRequestStatus.PENDING
    });
  });

  it('will add authorisation level on setAuthorisationLevel', () => {
    const newState = reducer(initialState, setAuthorisationLevel(AUTHORISATION_LEVEL.BASIC))
    expect(newState.auth.authorisationLevel).toBe(AUTHORISATION_LEVEL.BASIC);
  });
});