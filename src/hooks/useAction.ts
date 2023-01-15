import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import {AnyAction} from "@reduxjs/toolkit";

/**
 * This is a simple hook that lets us call action creators without having to dispatch them manually to store every time.
 * i.e.
 * const selfDispatchingAction = useAction(actionCreator)
 * selfDispatchingAction(...args); // will dispatch action to store alone.
 * @param action Any action we want to make self-dispatching
 */
const useAction = <T extends AnyAction>(action: T) => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(action, dispatch), [action, dispatch]);
}

export default useAction;