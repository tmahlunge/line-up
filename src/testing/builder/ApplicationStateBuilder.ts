import StateBuilder from "./StateBuilder";
import {legacy_createStore as createStore} from "redux";
import reducer from "../../reducers/reducer";
import AuthStateBuilder from "./AuthStateBuilder";
import RestStateBuilder from "./RestStateBuilder";

class ApplicationStateBuilder extends StateBuilder {
  private authStateBuilder: AuthStateBuilder | undefined;
  private restStateBuilder: RestStateBuilder | undefined;

  constructor() {
    super(createStore(reducer));
  }

  rest() {
    if (!this.restStateBuilder) {
      this.restStateBuilder = new RestStateBuilder(this.store);
    }

    return this.restStateBuilder;
  }

  auth() {
    if (!this.authStateBuilder) {
      this.authStateBuilder = new AuthStateBuilder(this.store);
    }

    return this.authStateBuilder;
  }
}

export default ApplicationStateBuilder;

export const applicationStateBuilder = () => new ApplicationStateBuilder();
