import {createReducer,} from '@reduxjs/toolkit'
import {AUTHORISATION_LEVEL, RestRequestStatus, State} from "../state";
import {
  setAuthorisationLevel,
  userDataRequestError,
  userDataRequestPending,
  userDataRequestSuccessful
} from "../actions/actions"

const initialState: State = {
  userMap: {},
  restRequestState: {
    state: RestRequestStatus.INITIAL
  },
  auth: {
    authorisationLevel: AUTHORISATION_LEVEL.ADMIN
  }
}

/**
 In reality, there would be a different reducer for each top level of state, i.e. authReducer, restRequestStateReducer,
 userMapReducer, but I'm just doing proof of concept here.
 */
const reducer = createReducer<State>(initialState,
  (builder) => {
    builder
      .addCase(setAuthorisationLevel, (state, action) => {
        const { authorisationLevel } = action.payload;

        state.auth = {
          authorisationLevel
        };
      })
      .addCase(userDataRequestPending, (state) => {
        state.restRequestState = {
          state: RestRequestStatus.PENDING
        };
      })
      .addCase(userDataRequestError, (state, action) => {
        const { userDataErrorResponseBody } = action.payload;

        state.restRequestState = {
          state: RestRequestStatus.ERROR,
          ...userDataErrorResponseBody
        }
      })
      .addCase(userDataRequestSuccessful, (state, action) => {
        const { userDataFromServer } = action.payload;
        const { avatar, first_name: firstName, last_name: lastName, email, id } = userDataFromServer

        state.restRequestState = {
          state: RestRequestStatus.SUCCESS
        };

        state.userMap[id] = {
          avatar,
          id,
          email,
          lastName,
          firstName
        }
      })
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {
      })
  }
);

export default reducer