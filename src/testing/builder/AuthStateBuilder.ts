import StateBuilder from "./StateBuilder";
import {AUTHORISATION_LEVEL} from "../../state";
import {setAuthorisationLevel} from "../../actions/actions";

class AuthStateBuilder extends StateBuilder {
  setAuthorisationLevel(authorisationLevel: AUTHORISATION_LEVEL){
    return this.dispatch(setAuthorisationLevel(authorisationLevel))
  }
}

export default AuthStateBuilder;