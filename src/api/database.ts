import { getDatabase, ref, set } from "firebase/database";

const writeUserData = (
  firstName: string | undefined,
  lastName: string | undefined,
  imageUrl: string | undefined,
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

export { writeUserData }