import { createStore } from 'redux'

function storeReducer(state = {
  userUid: null,
  userName: null,
  userLastName: null,
  userPicUrl: null,
}, action) {
  switch (action.type) {
    case 'setUserId': 
    //whole object reseted?
    return { state: state.userUid = null }
    default: 
      return state;
  }
}

let store = createStore(storeReducer)

store.subscribe(() => console.log(store.getState()))
store.dispatch({type: })