import { useContext } from 'react';
import NavBar from './NavBar/NavBar';
import styles from './Header.module.css';
import UserStore from '../../store/userStore';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { userStore } = useContext(UserStore);
  console.log('userStore', userStore);

  return (
    <div className={styles.headerContainer}>
      <p className={styles.headerTitle}>Welcome to Pokémon Center</p>
      <NavBar />
      <p className={styles.greetingMessage}>
        Hello {userStore.userName ? userStore.userName : 'Guest'}
      </p>
      <NavLink to="/profile">
        <div className={styles.profilePictureContainer}>
          {userStore.userPicUrl && (
            <img
              src={userStore.userPicUrl}
              alt="user's profile picture"
              className={styles.profilePicture}
            />
          )}
        </div>
      </NavLink>
    </div>
  );
};
export default Header;
