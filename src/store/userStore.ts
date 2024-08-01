import { createContext } from "react";
import { UserStoreContextProps, UserStoreProps } from "../types/types";

const initialUserStateProps: UserStoreProps = {
  userUid: null,
  userName: null,
  userLastName: null,
  userPicUrl: null,
};

const UserStore = createContext<UserStoreContextProps>({userStore: initialUserStateProps, dispatch: () => null})

export default UserStore;