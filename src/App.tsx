import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { UserContext } from './store/idStore';
import { Reducer, useEffect, useReducer, useState } from 'react';
import auth from './firebase';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserStore from './store/userStore';
import { userReducer } from './utils/utils';
import { UserStoreAction, UserStoreProps } from './types/types';
import { retrieveUserData } from './api/database';
import { Provider } from 'react-redux'
import store from './store/store';

function App() {
  const [currentUserID, setCurrentUserID] = useState<string | null>(() => {
    const initialState = sessionStorage.getItem('userUid');
    return initialState;
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

      if (currentUserDataFromDB) {
        store.dispatch({
          type: 'setUserUid',
          payload: currentUserID,
        });
        store.dispatch({
          type: 'setUserName',
          payload: currentUserDataFromDB?.firstName.firstName,
        });
        store.dispatch({
          type: 'setUserLastName',
          payload: currentUserDataFromDB?.lastName.lastName,
        });
        store.dispatch({
          type: 'setUserPicUrl',
          payload: currentUserDataFromDB?.imageUrl.imageUrl,
        });
      }
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
  }, [currentUserID, navigate]);

  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
