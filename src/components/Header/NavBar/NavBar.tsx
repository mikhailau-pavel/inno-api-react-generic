import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NavBarProps } from '../../../types/types';
import { useContext } from 'react';
import styles from './NavBar.module.css';
import { UserContext } from '../../../store/idStore';
import auth from '../../../firebase';
import { useDispatch } from 'react-redux';

const NavBar: React.FC<NavBarProps> = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { currentUserID, setCurrentUserID } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await auth.signOut();
    dispatch({
      type: 'signOutClear',
    });

    sessionStorage.removeItem('userUid');
    navigate('/');
  };

  return (
    <div className={styles.navBarContainer}>
      {isHomePage && !currentUserID && (
        <NavLink to="/register">Sign Up</NavLink>
      )}
      {isHomePage && !currentUserID && <NavLink to="/login">Login</NavLink>}
      {!isHomePage && <NavLink to="/">Home</NavLink>}
      {currentUserID && <button onClick={handleSignOut}>Sign Out</button>}
    </div>
  );
};

export default NavBar;
