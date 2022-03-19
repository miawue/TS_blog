import { PartialUser } from '../../../types';
import { SET_USER_DATA, CLEAR_USER_DATA, SET_PAGE_NUMBER } from './types';

export const setUserData = (userData: PartialUser) => ({
  type: SET_USER_DATA,
  userData,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export const setPageNumber = (pageNumber: number) => ({
  type: SET_PAGE_NUMBER,
  pageNumber,
});
