import {createReducer,} from '@reduxjs/toolkit'
import { State} from "../state";
import { cacheUserData} from "../actions/actions"

const initialState: State = {
    userMap: {},
}

const reducer = createReducer<State>(initialState,
    (builder) => {
        builder
          .addCase(cacheUserData, (state, action) => {
                const { userDataFromServer } = action.payload;
                const { avatar, first_name: firstName, last_name: lastName, email, id } = userDataFromServer

                state.userMap[id] = {
                  avatar,
                  id,
                  email,
                  lastName,
                  firstName
                }
            })
            // and provide a default case if no other handlers matched
            .addDefaultCase((state, action) => {})
    }
);

export default reducer