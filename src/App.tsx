import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { UserContext } from './store/store';
import { useEffect, useState } from 'react';
import auth from './firebase';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const [userData, setUserData] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(userData);
      } else {
        setUserData(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [userData]);

  useEffect(() => {
      const userFromStorage = sessionStorage.getItem('userUid');
      console.log('from session storage', userFromStorage)
      if (userFromStorage) setUserData(userFromStorage)
  }, [])

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignUpPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
