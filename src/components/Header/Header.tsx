import { useContext, useEffect, useState } from 'react';
import NavBar from './NavBar/NavBar';
import styles from './Header.module.css';
import UserStore from '../../store/userStore';

const Header = () => {
  const [userName, setUserName] = useState<string | undefined>('Guest');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { userStore } = useContext(UserStore);
  console.log('userStore', userStore);

  useEffect(() => {
    setUserName(userStore.userName);
    setImageUrl(userStore.userPicUrl);
  }, [userStore]);

  return (
    <div className={styles.headerContainer}>
      <p className={styles.headerTitle}>Welcome to Pokémon Center</p>
      <NavBar />
      
      <p className={styles.greetingMessage}>Hello {userName}</p>
      <div className={styles.profilePictureContainer}>
      <img
        src={imageUrl}
        alt="user's profile picture"
        className={styles.profilePicture}
      />
      </div>
    </div>
  );
};
export default Header;
