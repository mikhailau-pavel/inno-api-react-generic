import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NavBarProps, UserStoreProps } from '../../../types/types';
import styles from './NavBar.module.css';
import auth from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';

const NavBar: React.FC<NavBarProps> = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const currentUserID = useSelector((state: UserStoreProps) => {
    return state.userUid
  })
  const tempState = useSelector((state: UserStoreProps) => {return state})
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await auth.signOut();
    dispatch({
      type: 'signOutClear',
    });
    await console.log(tempState)

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
