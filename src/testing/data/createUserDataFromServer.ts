import {PartialExcept, UserDataFromServer} from "../../types/types";

const createUserData = (userDataFromServer: PartialExcept<UserDataFromServer, 'id'>): UserDataFromServer => ({
  avatar: 'http://hire-tad.com/images/good-developer.png',
  first_name: 'Tad',
  last_name: 'Mahlunge',
  email: 'tadiwamahlunge@gmail.com',
  ...userDataFromServer
})

export default createUserData