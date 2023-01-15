import {legacy_createStore as createStore} from "redux";
import reducer from "./reducers/reducer";
import {applyMiddleware, configureStore, PreloadedState} from "@reduxjs/toolkit";
import ActionLogger from "./middleware/ActionLogger";
import {State} from "./state";

// I am aware createStore has been deprecated, I am also aware of the benefits of createSlice & configureStore
// and will gladly discuss those in an interview!
const store = createStore(reducer, applyMiddleware(ActionLogger))

/**
 * Here we can take a preloaded state and configure a test store to have that initial state
 * while utilising the same reducer as we use in the non-test store. Again, this gives more robust
 * testing scenarios.
 */
export const setupStore = (preloadedState?: PreloadedState<State>) => {
  return configureStore({
    reducer,
    preloadedState
  })
};

export default store;