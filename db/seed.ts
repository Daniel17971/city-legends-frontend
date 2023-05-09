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
    // const legendId = faker.datatype.uuid();
    const coordinates = faker.address.nearbyGPSCoordinate(
      [53.992119, -1.541812],
      1
    );
    const legend = {
      title: faker.lorem.words(Math.floor(Math.random() * 6 + 10)),
      body: faker.lorem.words(Math.floor(Math.random() * 170 + 31)),
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
generateTestLegends(10);
