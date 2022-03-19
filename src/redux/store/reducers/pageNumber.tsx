import { PartialUser } from '../../../types';
import { SET_PAGE_NUMBER } from '../actions/types';

interface UserAction {
  type: string;
  userData?: any;
  user: PartialUser;
  pageNumber?: number;
}

export type Store = PartialUser & { pageNumber: number; isLogin: boolean };

const setPageNumber = (state = 1, action: UserAction) => {
  switch (action.type) {
    case SET_PAGE_NUMBER:
      return action.pageNumber;

    default:
      return state;
  }
};

export default setPageNumber;
