"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("firebase/database");
var faker_1 = require("@faker-js/faker");
var firebaseConfig_1 = require("../firebaseConfig");
function writeLegendData(legendId, legendObj) {
    var db = (0, database_1.getDatabase)(firebaseConfig_1.app);
    (0, database_1.set)((0, database_1.ref)(db, "legends/" + legendId), legendObj);
}
function writeUserData(userId, userObj) {
    var db = (0, database_1.getDatabase)(firebaseConfig_1.app);
    (0, database_1.set)((0, database_1.ref)(db, "users/" + userId), userObj);
}
var usersIdArr = [];
function generateTestUsers(numOfUsers) {
    for (var i = 0; i < numOfUsers; i++) {
        var userId = faker_1.faker.datatype.uuid();
        usersIdArr.push(userId);
        var user = {
            firstName: faker_1.faker.name.firstName(),
            lastName: faker_1.faker.name.lastName(),
            email: faker_1.faker.internet.email(),
            dateOfBirth: faker_1.faker.date.birthdate(),
        };
        writeUserData(userId, user);
    }
}
function generateTestLegends(numOfLegends) {
    for (var i = 0; i < numOfLegends; i++) {
        var legendId = faker_1.faker.datatype.uuid();
        var coordinates = faker_1.faker.address.nearbyGPSCoordinate([53.992119, -1.541812], 1);
        var legend = {
            title: faker_1.faker.lorem.words(Math.floor(Math.random() * 6 + 10)),
            body: faker_1.faker.lorem.words(Math.floor(Math.random() * 170 + 31)),
            author: usersIdArr[Math.floor(Math.random() * usersIdArr.length)],
            lat: coordinates[0],
            long: coordinates[1],
        };
        writeLegendData(legendId, legend);
    }
}
// Seed test DB
generateTestUsers(3);
generateTestLegends(3);
