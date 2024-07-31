import { legacy_createStore } from 'redux'

function storeReducer(state = {
  userUid: null,
  userName: null,
  userLastName: null,
  userPicUrl: null,
}, action) {
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

store.subscribe(() => console.log('state inside',store.getState()))

export default store;
export { storeReducer }