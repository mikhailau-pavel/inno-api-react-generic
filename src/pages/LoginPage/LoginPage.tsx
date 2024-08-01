import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <p>Don't have an account yet?</p> <Link to="/register">Sign up</Link>
    </div>
  );
};
export default LoginPage;
