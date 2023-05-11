import { getDatabase, ref, child, get, set, push } from "firebase/database";
import { app } from "../firebaseConfig";

const db = getDatabase(app);

export const getLegends = () => {
  return get(child(ref(db), `/legends`))
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

export const postLegend = (legend: object) => {
  return push(ref(db, "legends/"), legend)
    .then((response) => {})
    .catch((error) => alert(error));
};

export const getLegendById = (id) => {
  return get(child(ref(db), `/legends/${id}`))
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

export const postRoutes = (route) => {
  return push(ref(db, "routes/"), route)
    .then((response) => {})
    .catch((error) => alert(error));
};

export const getRoutes = () => {
  return get(child(ref(db), `/routes`))
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
