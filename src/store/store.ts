import { createContext } from "react";
import { UserContextProps } from "../types/types";

const UserContext = createContext<UserContextProps>({userData: '', setUserData: () => {}})

export { UserContext }
