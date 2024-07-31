import { legacy_createStore } from 'redux'
import { UserStoreAction, UserStoreProps } from '../types/types';

function storeReducer(state: UserStoreProps = {
  userUid: null,
  userName: null,
  userLastName: null,
  userPicUrl: null,
}, action: UserStoreAction) {
  switch (action.type) {
    case 'setUserUid':
      return { ...state, userUid: action.payload };
    case 'setUserName':
      return { ...state, userName: action.payload };
    case 'setUserLastName':
      return { ...state, userLastName: action.payload };
    case 'setUserPicUrl':
      return { ...state, userPicUrl: action.payload };
    default:
      return state;
  }
}

const store = legacy_createStore(storeReducer)

export default store;
export { storeReducer }