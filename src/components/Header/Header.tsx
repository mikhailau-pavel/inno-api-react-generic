import { useEffect, useState } from 'react';
import NavBar from './NavBar/NavBar';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import store from '../../store/store';
import { UserStoreProps } from '../../types/types';

const Header = () => {
  const [userStore, setUserStore] = useState<UserStoreProps>({});
  store.subscribe(() => {
    setUserStore(store.getState());
    //console.log('store in header3', store.getState());
  });
  useEffect(() => console.log('stated store', userStore), [userStore]);

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
