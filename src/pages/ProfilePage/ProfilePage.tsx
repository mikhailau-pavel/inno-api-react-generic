import { useContext, useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import axios from 'axios';
import {
  IMAGE_UPLOAD_API_KEY,
  IMGBB_UPLOAD_BASE_URL,
} from '../../constants/constants';
import { writeUserData } from '../../api/database';
import { UserContext } from '../../store/store';
import { GetProfileData } from '../../types/types';
import UserStore from '../../store/userStore';

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState<string | undefined>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [image, setImage] = useState<Blob | null>(null);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState<GetProfileData | null>();

  const userUid = useContext(UserContext).currentUserID;
  const { userStore, dispatch } = useContext(UserStore)

  const handleNameFieldSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const imageUrl = undefined
      writeUserData(firstName, lastName, imageUrl, userUid);
     if (firstName)
        dispatch({type: 'setUserName', payload: firstName})
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
      console.log('response', response.data)
      const imageUrl: string | undefined = response.data.data.url;
      writeUserData(firstName, lastName, imageUrl, userUid);
      dispatch({type: 'setUserPicUrl', payload: imageUrl})
    } catch (error) {
      setFormError(String(error));
      console.log('error', error);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const formData = new FormData();
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
        <div className={styles.profileInfoContainer}>
          <p>Profile:</p>
          <div className={styles.profileInfo}>
            <p>
              First Name:{' '}
              {typeof userStore.userName != 'undefined' ? userStore.userName : 'Anonymous'}
            </p>
            <p>
              Last Name: {typeof userStore.userName != 'undefined' ? userStore.userName : 'Anonymous'}
            </p>
            {userStore.userPicUrl && (
              <img
                src={typeof userStore.userPicUrl !== "undefined" ? userStore.userPicUrl : undefined}
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
