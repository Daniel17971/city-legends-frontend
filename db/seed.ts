import { getDatabase, ref, set, push } from "firebase/database";
import { faker } from "@faker-js/faker";
import { app } from "../firebaseConfig";

const db = getDatabase(app);

function writeLegendData(legend: object) {
  push(ref(db, "legends/"), legend);
}

function writeUserData(userId: string, userObj: object) {
  set(ref(db, "users/" + userId), userObj);
}

const usersIdArr = [];
const legendCategoryArr = ["myth", "personal","further_back_history", "recent_history"];

function generateTestUsers(numOfUsers: number) {
  for (let i = 0; i < numOfUsers; i++) {
    const userId = faker.datatype.uuid();
    usersIdArr.push(userId);
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate(),
    };
    writeUserData(userId, user);
  }
}

function generateTestLegends(numOfLegends: number) {
  for (let i = 0; i < numOfLegends; i++) {
    const coordinates = faker.address.nearbyGPSCoordinate(
      [53.4808, 2.2426],
      2
    );
    const legend = {
      title: faker.lorem.words(Math.floor(Math.random() * 6 + 10)),
      body: faker.lorem.words(Math.floor(Math.random() * 150 + 31)),
      legendCategory: legendCategoryArr[Math.floor(Math.random() * legendCategoryArr.length)],
      location: {
        latitude: coordinates[0],
        longitude: coordinates[1],
      },
    };
    writeLegendData(legend);
  }
}

// Seed test DB
// generateTestUsers(3);
generateTestLegends(20);
