import { useContext } from 'react';
import { UserContext } from '../../store/store';
import NavBar from './NavBar/NavBar';
import styles from './Header.module.css'

const Header = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className={styles.headerContainer}>
      <p className={styles.headerTitle}>Welcome to Pokémon Center</p>
      <NavBar />
      <p className={styles.greetingMessage}>Hello {userData ? userData : 'Guest'}</p>
    </div>
  );
};
export default Header;
