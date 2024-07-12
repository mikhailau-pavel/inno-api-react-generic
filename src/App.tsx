import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignUpPage />} />
        </Routes>
    </>
  );
}

export default App;
