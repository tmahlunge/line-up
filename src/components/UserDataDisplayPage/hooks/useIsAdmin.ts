import {useSelector} from "react-redux";
import {AUTHORISATION_LEVEL, State} from "../../../state";

const useIsAdmin = () => {
  const authorisationLevel = useSelector((state: State) => state.auth.authorisationLevel);
  return { isAdmin: authorisationLevel === AUTHORISATION_LEVEL.ADMIN };
}

export default useIsAdmin;