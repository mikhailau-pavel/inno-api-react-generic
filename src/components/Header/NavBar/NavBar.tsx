import { NavLink, useLocation } from 'react-router-dom';
import { NavBarProps } from '../../../types/types';
import { useContext } from 'react';
//import UserContext from '../../../store/store';
import styles from './NavBar.module.css'

const NavBar: React.FC<NavBarProps> = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  //const userData = useContext(UserContext)
  //temp >
  const isAuthorized = false

  //console.log('is Authorized', userData)
  return (
    <div className="navBarContainer">
      {isHomePage && !isAuthorized && <NavLink to="/register">Sign Up</NavLink>}
      {isHomePage && !isAuthorized && <NavLink to="/login">Login</NavLink>}
      {!isHomePage && <NavLink to="/">Home</NavLink>}
      {isAuthorized && <p className={styles.greeting}> Hello </p>}
    </div>
  );
};

export default NavBar;
