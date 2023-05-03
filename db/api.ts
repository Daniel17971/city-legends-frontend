import { getDatabase, ref, child, get } from "firebase/database";
import { app } from "../firebaseConfig";

const dbRef = ref(getDatabase(app));

export const getLegends = () => {
  return get(child(dbRef, `/legends`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
