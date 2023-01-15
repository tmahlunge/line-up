import {State} from "../state";
import reducer from "./reducer";
import {cacheUserData} from "../actions/actions";
import {UserDataFromServer} from "../types/types";
import createUserDataFromServer from "../testing/data/createUserDataFromServer";

describe('reducer tests', () => {
  const initialState: State = {
    userMap: {},
  };

  const userDataFromServer: UserDataFromServer = createUserDataFromServer({ id: 0 })

  it('will add data to userMap on cacheUserData', () => {
    const newState = reducer(initialState, cacheUserData(userDataFromServer))
    expect(newState.userMap[0]).toEqual({
      avatar: 'http://hire-tad.com/images/good-developer.png',
      firstName: 'Tad',
      lastName: 'Mahlunge',
      email: 'tadiwamahlunge@gmail.com',
      id: 0
    })
  })
})