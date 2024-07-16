import { useState } from 'react';
import styles from './ProfilePage.module.css';
import { getDatabase, ref, set } from 'firebase/database';
import axios from 'axios';
import {
  IMAGE_UPLOAD_API_KEY,
  IMAGE_UPLOAD_BASE_URL,
} from '../../constants/constants';

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState<string | undefined>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [image, setImage] = useState<Blob | null>(null);
  const [formData, setFormData] = useState({});

  const writeUserData = (name: string | undefined) => {
    const db = getDatabase();
    set(ref(db, 'users/' + 1), { name: name });
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      console.log('who?', firstName);
      writeUserData(firstName);
      setFormError(null);
    } catch (error) {
      setFormError(String(error));
      console.log('error', error);
    }
  };

  const uploadPhoto = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Client-ID {{clientId}}');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    try {
      await axios
        .post(
          `${IMAGE_UPLOAD_BASE_URL}, ${requestOptions}`
        )
        .then((response) => {
          const data = response.data;
          console.log('data res', data.results);
        });
    } catch (error) {
      setFormError(String(error));
      console.log('error', error);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const formData = new FormData();
      //formData.set('key', IMAGE_UPLOAD_API_KEY);
      formData.append('image', e.target.files[0], e.target.files[0].name);
      formData.append('description', `this is profile picture`);
      setFormData(formData)
      console.log('form-data', formData.getAll('image'));
      console.log('e.target.files[0]', e.target.files[0]);
    }
  };

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.profileContainer}>
        {formError && <span>{formError}</span>}
        <p>Name</p>
        <p>name-text-placeholder</p>
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button
          type="submit"
          onClick={onSubmit}
          className={styles.submitButton}
        >
          Submit
        </button>
        <label htmlFor="firstName">Upload a profile picture:</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleFileInputChange}
        />
        <button
          type="submit"
          onClick={uploadPhoto}
          className={styles.submitButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
