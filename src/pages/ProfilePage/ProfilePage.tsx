import { useState } from 'react';
import styles from './ProfilePage.module.css';
import axios from 'axios';
import {
  IMAGE_UPLOAD_API_KEY,
  IMGBB_UPLOAD_BASE_URL,
} from '../../constants/constants';
import { writeUserData } from '../../api/database';
import { UserStoreProps } from '../../types/types';
import { useSelector } from 'react-redux';

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [image, setImage] = useState<Blob | null>(null);
  const [formData, setFormData] = useState({});
  const userStore = useSelector((state: UserStoreProps) => {
    return state;
  });

  const handleNameFieldSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      writeUserData(firstName, lastName, null, userStore.userUid);
      setFormError(null);
    } catch (error) {
      setFormError(String(error));
      throw error;
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
      const imageUrl: string | null = response.data.data.url;
      writeUserData(firstName, lastName, imageUrl, userStore.userUid);
    } catch (error) {
      setFormError(String(error));
      throw new Error(`Error:${String(error)}`);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const formData = new FormData();
      formData.append('image', e.target.files[0], e.target.files[0].name);
      formData.append('description', `this is profile picture`);
      setFormData(formData);
    }
  };

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.profileContainer}>
        {formError && <span>{formError}</span>}
        <div className={styles.profileInfoContainer}>
          <p>Profile:</p>
          <div className={styles.profileInfo}>
            <p>
              First Name:{' '}
              {userStore.userName ? userStore.userName : 'Anonymous'}
            </p>
            <p>
              Last Name:{' '}
              {userStore.userLastName ? userStore.userLastName : 'Anonymous'}
            </p>
            {userStore.userPicUrl && (
              <img
                src={userStore.userPicUrl ? userStore.userPicUrl : undefined}
                alt="Profile picture"
                className={styles.profilePicture}
              />
            )}
          </div>
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
          onClick={handleNameFieldSubmit}
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
