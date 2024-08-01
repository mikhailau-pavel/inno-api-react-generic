import { legacy_createStore } from 'redux'
import { UserStoreAction, UserStoreProps } from '../types/types';

const initialStore = {
    userUid: null,
    userName: null,
    userLastName: null,
    userPicUrl: null,
  }

/*const setUserUid = () => ({
  type: 'setUserUid',
  payload: currentUserAuth,})
const setUserName = () => {}
const setUserLastName = () => {}
const setUserPicUrl = () => {}
const signOutClear = () => {}*/
function storeReducer(state: UserStoreProps = initialStore, action: UserStoreAction) {
  switch (action.type) {
    case 'setUserUid':
      return { ...state, userUid: action.payload };
    case 'setUserName':
      return { ...state, userName: action.payload };
    case 'setUserLastName':
      return { ...state, userLastName: action.payload };
    case 'setUserPicUrl':
      return { ...state, userPicUrl: action.payload };
    case 'signOutClear': 
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
//, setUserUid, setUserName, setUserLastName, setUserPicUrl, signOutClear