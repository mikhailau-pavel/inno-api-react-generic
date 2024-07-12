import { createContext, useState } from "react";
import { UserContextProps } from "../types/types";

const UserContext = createContext('how is this closer than app')
/*const [userData, setUserData] = useState<string>('')

const initialUserContextProps = { 
  username: '',
  isAuthorized: false,
  uid: 0,
}*/

export { UserContext }
