import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import auth from '../../firebase';
import { UserContext } from '../../store/store';


const LoginForm = () => {
  //redirect after
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useContext(UserContext)
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('login attempt', user.email)
        //userInfo.setUserData(user.email)
        //setEmail(user.email)
        console.log('check context', userInfo)
        //navigate('/login')
      })
      .catch((error) => console.log('error', error));
  };
  //jsify
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
