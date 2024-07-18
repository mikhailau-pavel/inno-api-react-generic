import { child, get, getDatabase, ref, set } from "firebase/database";
import { GetProfileData } from "../types/types";

const writeUserData = (
  firstName: string | null,
  lastName: string | null,
  imageUrl: string | null,
  userUid: string | null
) => {
  const db = getDatabase();
  if(firstName)
  set(ref(db, 'users/' + `${userUid}/` + 'firstName'), { firstName });
  if(lastName)
  set(ref(db, 'users/' + `${userUid}/` + 'lastName'), { lastName });
  if(imageUrl)
  set(ref(db, 'users/' + `${userUid}/` + 'imageUrl'), { imageUrl });
};

const retrieveUserData = (
  userUid: string | null
): Promise<GetProfileData | null | undefined> => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, 'users/' + `${userUid}/`)) 
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log('snapshot exists', snapshot.val())
      const userData = snapshot.val()
      return userData
    } else {
      console.log('no data')
      return null
    }
  })
  .catch ((error) => {
    console.log('error', error)
  });
} 

export { writeUserData, retrieveUserData }