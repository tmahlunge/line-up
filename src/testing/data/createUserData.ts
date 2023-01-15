import {PartialExcept, UserData} from "../../types/types";

const createUserData = (userData: PartialExcept<UserData, 'id'>): UserData => ({
  avatar: 'http://hire-tad.com/images/good-developer.png',
  firstName: 'Tad',
  lastName: 'Mahlunge',
  email: 'tadiwamahlunge@gmail.com',
  ...userData
})

export default createUserData