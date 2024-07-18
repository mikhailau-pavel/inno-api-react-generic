import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { UserContext } from './store/store';
import { Reducer, useEffect, useReducer, useState } from 'react';
import auth from './firebase';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserStore from './store/userStore';
import { userReducer } from './utils/utils';
import { UserStoreAction, UserStoreProps } from './types/types';
import { retrieveUserData } from './api/database';

function App() {
  const [currentUserID, setCurrentUserID] = useState<string | null>(() => {
    const initialState = sessionStorage.getItem('userUid');
    return initialState
  });
  const navigate = useNavigate();
  const userFromStorage = sessionStorage.getItem('userUid');
  const initialUserStateProps: UserStoreProps = {
    userUid: null,
    userName: null,
    userLastName: null,
    userPicUrl: null,
  };

  const [userStore, dispatch] = useReducer<
    Reducer<UserStoreProps, UserStoreAction>
  >(userReducer, initialUserStateProps);

  useEffect(() => {
    const setCurrentUserStore = async () => {
      const currentUserDataFromDB = await retrieveUserData(currentUserID);
      dispatch({
        type: 'setUserUid',
        payload: currentUserID,
      });
      if (currentUserDataFromDB){
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
      });}
      console.log('user data recieved from DB', currentUserDataFromDB);
    };
    setCurrentUserStore();
  }, [currentUserID]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserID(currentUserID);
      } else {
        setCurrentUserID(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [currentUserID]);

  return (
    <>
      <UserContext.Provider value={{ currentUserID, setCurrentUserID }}>
        <UserStore.Provider value={{ userStore, dispatch }}>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignUpPage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute authorizedUser={userFromStorage}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<p>404 Page Not Found</p>} />
          </Routes>
        </UserStore.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
