import { UserData } from "../api/database"
import { UserActions } from "./actions"


const setUserUid = (userData: string | null) => ({
  type: UserActions.SET_USER_ID,
  payload: userData
})

const setUserName = (userData: UserData) => ({
  type: UserActions.SET_FIRST_NAME,
  payload: userData?.firstName.firstName,
})

const setUserLastName = (userData: UserData) => ({
  type: UserActions.SET_LAST_NAME,
  payload: userData?.lastName.lastName,
})

const setUserPicUrl = (userData: UserData) => ({
  type: UserActions.SET_USER_PIC_URL,
  payload: userData?.imageUrl.imageUrl,
})

const signOutClear = () => ({
  type: UserActions.SIGN_OUT_CLEAR,
  payload: { 
    userUid: null,
    userName: null,
    userLastName: null,
    userPicUrl: null, 
  }
})

export { setUserUid, setUserName, setUserLastName, setUserPicUrl, signOutClear }