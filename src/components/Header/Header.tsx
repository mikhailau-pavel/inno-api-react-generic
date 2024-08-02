import NavBar from './NavBar/NavBar';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserStoreProps } from '../../types/types';

const Header = () => {
  const userStore = useSelector((state: UserStoreProps) => {
    return state
  })

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
