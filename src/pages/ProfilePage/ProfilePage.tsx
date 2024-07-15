import { useState } from 'react';
import styles from './ProfilePage.module.css';
import { getDatabase, ref, set } from 'firebase/database';
import axios from 'axios';
import { IMAGE_UPLOAD_API_KEY, IMAGE_UPLOAD_BASE_URL } from '../../constants/constants';

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState<string | undefined>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const writeUserData = (name: string | undefined) => {
    const db = getDatabase();
    set(ref(db, 'users/' + 1), {name: name})
  } 

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      console.log('who?', firstName);
      writeUserData(firstName)
      setFormError(null);
    } catch (error) {
      setFormError(String(error));
      console.log('error', error);
    }
  };

  const uploadPhoto = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData()
    formData.set('key', IMAGE_UPLOAD_API_KEY)
    formData.append('image', 'to base64 whatever')
    console.log('formData key', formData.get('key'))


    try {
      axios.post(`${IMAGE_UPLOAD_BASE_URL}?key=${IMAGE_UPLOAD_API_KEY}&source=${imageUrl}`)/*, {
        firstName: 'test',
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })*/
      .then((response) => {
        const data = response.data;
        console.log('data res', data.results)
      })
      console.log('url check', `${IMAGE_UPLOAD_BASE_URL}?key=${IMAGE_UPLOAD_API_KEY}&source=${imageUrl}`)
      
    } catch (error) {
      setFormError(String(error));
      console.log('error', error);
      }
    }

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
          onChange={(e) => setImageUrl(e.target.value)}
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
