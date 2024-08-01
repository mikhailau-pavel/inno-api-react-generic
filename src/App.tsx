import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { useEffect } from 'react';
import auth from './firebase';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { retrieveUserData } from './api/database';
import { useDispatch, useSelector } from 'react-redux';
import { UserStoreProps } from './types/types';

function App() {
  const currentUserAuth = useSelector((state: UserStoreProps) => state.userUid);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCurrentUserStore = async () => {
      const currentUserDataFromDB = await retrieveUserData(currentUserAuth);
      dispatch({
        type: 'setUserUid',
        payload: currentUserAuth,
      });
      if (currentUserDataFromDB) {
        dispatch({
          type: 'setUserName',
          payload: currentUserDataFromDB?.firstName.firstName,
        });
        dispatch({
          type: 'setUserLastName',
          payload: currentUserDataFromDB?.lastName.lastName,
        });
        dispatch({
          type: 'setUserPicUrl',
          payload: currentUserDataFromDB?.imageUrl.imageUrl,
        });
      }
    };
    setCurrentUserStore();
  }, [currentUserAuth, dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'setUserUid',
          payload: currentUserAuth,
        });
      } else {
        dispatch({
          type: 'setUserUid',
          payload: null,
        });
      }
    });

    return () => unsubscribe();
  }, [currentUserAuth, dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute authorizedUser={currentUserAuth}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<p>404 Page Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
