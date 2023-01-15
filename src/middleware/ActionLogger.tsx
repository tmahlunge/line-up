import {AnyAction} from "@reduxjs/toolkit";
import {State} from "../state";
import { Middleware} from "redux";

/**
 * A simple logging middleware added to make development simpler. This will simply log the state change created
 * by the action. I fully accept I could have created a type
 * @param store A store to pass into the middleware to intercept actions.
 * @constructor A curry function that redux uses to generate next state.
 */
const ActionLogger: Middleware<AnyAction, State> = (store) => (next) => (action) => {
  console.log('Dispatching Action', action)
  const result = next(action)
  console.log('Next State', store.getState())
  return result;
}

export default ActionLogger;
