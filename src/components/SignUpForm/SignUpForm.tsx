import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import auth from '../../firebase';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log('signed user', user);
      setFormError(null);
      navigate('/login');
    } catch (error) {
      setFormError(String(error));
      console.log('error', error);
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sign up:</h2>
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
        {formError && <span>{formError}</span>}
        <button
          type="submit"
          onClick={onSubmit}
          className={styles.submitButton}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
