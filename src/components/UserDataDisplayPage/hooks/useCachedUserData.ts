import {useSelector} from "react-redux";
import {State} from "../../../state";

/**
 * This hook just pulls cached data out of the application redux-store for a provided userId.
 * @param userId id to pull data out for
 */
const useCachedUserData = (userId: string | undefined) => {
  const userMap = useSelector((state: State) => state.userMap);
  return userMap[Number(userId)];
}

export default useCachedUserData;