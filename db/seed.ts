import { getDatabase, ref, set } from "firebase/database";
import { faker } from '@faker-js/faker';
import {app} from "../firebaseConfig";

function writeLegendData(legendId, legendObj) {
  const db = getDatabase(app);
  set(ref(db, 'legends/' + legendId), legendObj);
}

function writeUserData(userId, userObj) {
  const db = getDatabase(app);
  set(ref(db, 'users/' + userId), userObj);
}


const usersIdArr = [];

function generateTestUsers(numOfUsers){
    const users = {};
    for(let i = 0; i < numOfUsers; i++){
        const userId = faker.datatype.uuid();
        usersIdArr.push(userId);
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            dateOfBirth: faker.date.birthdate(),
        }
        writeUserData(userId, user)
    }
}

function generateTestLegends(numOfLegends){
    const legends = {}
    for(let i = 0; i < numOfLegends; i++){
        const legendId = faker.datatype.uuid();
        const coordinates = faker.address.nearbyGPSCoordinate([53.992119, -1.541812], 1);
        const legend = {
            title: faker.lorem.words(Math.random() * 6 + 10),
            body: faker.lorem.words(Math.random() * 170 + 31),
            author: usersIdArr[Math.random() * usersIdArr.length],
            lat: coordinates[0],
            long: coordinates[1]
        }
        writeLegendData(legendId, legend);
    }
}

// Seed test DB
generateTestLegends(3);
generateTestUsers(3);
