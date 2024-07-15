import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import auth from '../../firebase';
import { UserContext } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useContext(UserContext);
  //const navigate = useNavigate();

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      setUserData(user.email || '');
      //navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };
  //<span id="emailFeedback"></span>
  //placeholder prop?
  return (
    <div className="loginFormContainer">
      <h2>Login:</h2>
      <form action="">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern=".+@example\.com"
          size={20}
          required
        />
        <label htmlFor="pass">Password(min 6):</label>
        <input
          type="password"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
        <button type="submit" onClick={onSubmit}>
          Log-in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
