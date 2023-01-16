import StateBuilder from "./StateBuilder";
import {UserDataErrorResponseBody, UserDataFromServer} from "../../types/types";
import {userDataRequestPending, userDataRequestError, userDataRequestSuccessful} from "../../actions/actions";

class RestStateBuilder extends StateBuilder {
  userDataRequestSuccessful(userDataFromServer: UserDataFromServer){
    return this.dispatch(userDataRequestSuccessful(userDataFromServer))
  };

  userDataRequestError(userDataErrorResponseBody: UserDataErrorResponseBody){
    return this.dispatch(userDataRequestError(userDataErrorResponseBody))
  };

  userDataRequestPending(){
    return this.dispatch(userDataRequestPending())
  };
}

export default RestStateBuilder;