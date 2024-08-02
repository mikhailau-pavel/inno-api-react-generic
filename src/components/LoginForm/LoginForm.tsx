import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import auth from '../../firebase';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch({ type: 'SET_USER_ID', payload: user.uid });
      navigate('/');
      sessionStorage.setItem('userUid', String(user.uid));
    } catch (error) {
      setFormError(String(error));
      throw error;
    }
  };
  return (
    <div className={styles.formContainer}>
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
        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
        {formError && <span>{formError}</span>}
        <button
          type="submit"
          onClick={onSubmit}
          className={styles.submitButton}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
