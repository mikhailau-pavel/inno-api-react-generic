import { legacy_createStore } from 'redux'
import { UserStoreAction, UserStoreProps } from '../types/types';

const initialStore = {
    userUid: null,
    userName: null,
    userLastName: null,
    userPicUrl: null,
  }

function storeReducer(state: UserStoreProps = initialStore, action: UserStoreAction) {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userUid: action.payload };
    case 'SET_FIRST_NAME':
      return { ...state, userName: action.payload };
    case 'SET_LAST_NAME':
      return { ...state, userLastName: action.payload };
    case 'SET_USER_PIC_URL':
      return { ...state, userPicUrl: action.payload };
    case 'SIGN_OUT_CLEAR': 
      return { ...state,  userUid: null,
        userName: null,
        userLastName: null,
        userPicUrl: null,
      }
    default:
      return state;
  }
}

const store = legacy_createStore(storeReducer)

export default store;
export { storeReducer }