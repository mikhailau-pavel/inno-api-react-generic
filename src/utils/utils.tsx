import { UserStoreAction, UserStoreProps } from '../types/types';

const userReducer = (state: UserStoreProps, action: UserStoreAction) => {
  switch (action.type) {
    case 'setUserUid':
      return { ...state, userUid: action.payload };
    case 'setUserName':
      return { ...state, userName: action.payload };
    case 'setUserPicUrl':
      return { ...state, userPicUrl: action.payload };
    default:
      return state;
  }
};
export { userReducer };
