import { PartialUser } from '../../../types';
import { SET_USER_DATA, CLEAR_USER_DATA } from '../actions/types';

interface UserAction {
  type: string;
  userData?: any;
  user: PartialUser;
}

export type Store = PartialUser & { isLogin: boolean };

const initialState: Store = {
  username: '',
  email: '',
  token: '',
  bio: '',
  image: '',
  isLogin: false,
};

const changeUserData = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.userData,
        isLogin: true,
      };
    case CLEAR_USER_DATA:
      return initialState;

    default:
      return state;
  }
};

export default changeUserData;
