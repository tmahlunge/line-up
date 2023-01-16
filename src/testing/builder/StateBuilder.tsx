import {AnyAction, Store} from "@reduxjs/toolkit";
import {State} from "../../state";

class StateBuilder {
  protected store: Store<State>

  protected constructor(store: Store<State>) {
    this.store = store;
  }

  protected dispatch(action: AnyAction) {
    this.store.dispatch(action)
    return this;
  }

  public build() {
    return this.store.getState();
  }
}

export default StateBuilder;