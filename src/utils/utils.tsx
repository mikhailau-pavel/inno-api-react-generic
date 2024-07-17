import { UserStoreAction, UserStoreProps } from "../types/types";

const userReducer = (state: UserStoreProps, action: UserStoreAction) => {
  switch (action.type) {
    case 'setUserUid': (newUid: string | null) => state.userUid = newUid
    break
    case 'setUserName': (newUserName: string | null) => state.userName = newUserName
    break
    case 'setUserPicUrl': (newUserPicUrl: string | null) => state.userPicUrl = newUserPicUrl
    break
    default: console.log('no action provided')

  }
} 

export { userReducer }