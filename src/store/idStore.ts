import { createContext } from "react";
import { UserContextProps } from "../types/types";

const UserContext = createContext<UserContextProps>({currentUserID: '', setCurrentUserID: () => {}})

export { UserContext }
