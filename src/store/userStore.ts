import { createContext } from "react";
import { UserStoreContextProps, UserStoreProps } from "../types/types";

const initialUserStateProps: UserStoreProps = {
  userUid: undefined,
  userName: undefined,
  userLastName: undefined,
  userPicUrl: undefined,
};

const UserStore = createContext<UserStoreContextProps>({userStore: initialUserStateProps, dispatch: () => null})

export default UserStore;