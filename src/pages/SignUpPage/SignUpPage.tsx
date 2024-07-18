import { Link } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpPage = () => {
  return (
    <div>
      <SignUpForm />
      <p>Already registered?</p> <Link to="/login"> Login</Link>
    </div>
  );
};
export default SignUpPage;
