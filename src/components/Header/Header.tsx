import { useContext } from 'react';
import { UserContext } from '../../store/store';
import NavBar from './NavBar/NavBar';

const Header = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="headerContainer">
      <h1 className="headerTitle">Welcome </h1>
      <NavBar />
      <p>Hello {userData ? userData : 'Guest'}</p>
    </div>
  );
};
export default Header;

//to Pokémon Center
