import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NavBarProps } from '../../../types/types';
import { useContext } from 'react';
import styles from './NavBar.module.css';
import { UserContext } from '../../../store/store';
import auth from '../../../firebase';

const NavBar: React.FC<NavBarProps> = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUserData(null);
      navigate('/');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className={styles.navBarContainer}>
      {isHomePage && !userData && <NavLink to="/register">Sign Up</NavLink>}
      {isHomePage && !userData && <NavLink to="/login">Login</NavLink>}
      {!isHomePage && <NavLink to="/">Home</NavLink>}
      {userData && <button onClick={handleSignOut}>Sign Out</button>}
    </div>
  );
};

export default NavBar;
