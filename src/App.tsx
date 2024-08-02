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
import {
  setUserLastName,
  setUserName,
  setUserPicUrl,
  setUserUid,
} from './store/actionControls';

function App() {
  const currentUserAuth = useSelector((state: UserStoreProps) => state.userUid);
  const dispatch = useDispatch();
  const currentUserID = sessionStorage.getItem('userUid');
  dispatch(setUserUid(currentUserID))

  useEffect(() => {
    const setCurrentUserStore = async () => {
      const currentUserDataFromDB = await retrieveUserData(currentUserAuth);
      dispatch(setUserUid(currentUserAuth));
      if (currentUserDataFromDB) {
        dispatch(setUserName(currentUserDataFromDB));
        dispatch(setUserLastName(currentUserDataFromDB));
        dispatch(setUserPicUrl(currentUserDataFromDB));
      }
    };
    setCurrentUserStore();
  }, [currentUserAuth, dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'SET_USER_ID',
          payload: currentUserAuth,
        });
      } else {
        dispatch({
          type: 'SET_USER_ID',
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
            <ProtectedRoute authorizedUser={currentUserID}>
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
