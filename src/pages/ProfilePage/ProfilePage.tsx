import { useContext, useState } from 'react';
import styles from './ProfilePage.module.css';
import { getDatabase, ref, set } from 'firebase/database';
import axios from 'axios';
import {
  IMAGE_UPLOAD_API_KEY,
  IMGBB_UPLOAD_BASE_URL,
} from '../../constants/constants';
import { writeUserData } from '../../api/database';
import { UserContext } from '../../store/store';
//import { ProfileData } from '../../types/types';

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState<string | undefined>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [image, setImage] = useState<Blob | null>(null);
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  //const [userData, setUserData] = useState<ProfileData>({});


  const userUid = useContext(UserContext).userData

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      writeUserData(firstName, lastName, imageUrl, userUid);
      setFormError(null);
    } catch (error) {
      setFormError(String(error));
      console.log('error', error);
    }
  };

  const uploadPhoto = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!image) {
      setFormError('select an image');
      return;
    }

    try {
      const response = await axios.post(IMGBB_UPLOAD_BASE_URL, formData, {
        params: {
          key: IMAGE_UPLOAD_API_KEY,
        },
      });
      const data = response.data;
      console.log('data res', data);
      console.log('response.data.data.url', response.data.data.url);
      setImageUrl(response.data.data.url);
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
      setFormData(formData);
      console.log('form-data-image', formData.getAll('image'));
      console.log('e.target.files[0]', e.target.files[0]);
    }
  };

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.profileContainer}>
        {formError && <span>{formError}</span>}
        <p>Profile:</p>
        <div className={styles.profileInfo}>
          <p>First Name: {firstName || 'Anonymous'}</p>
          <p>Last Name: {lastName || ' Anonymous'}</p>
          {imageUrl && <img src={imageUrl} alt="Profile" />}
        </div>
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
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
