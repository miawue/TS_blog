import { combineReducers } from 'redux';
import changeUserData from './userData';
import setPageNumber from './pageNumber';

export const rootReducer = combineReducers({
  userData: changeUserData,
  pageNumber: setPageNumber,
});
