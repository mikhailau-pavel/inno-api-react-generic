import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { UserContext } from './store/store';
import { useEffect, useState } from 'react';
import auth from './firebase';

function App() {
  //string null to the interface?
  const [userData, setUserData] = useState<string | null>(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(userData);
      } else {
        setUserData(null);
        //navigate('/');
      }
    });

    return () => unsubscribe();
  }, [userData]);

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignUpPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
