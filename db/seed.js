"use strict";
exports.__esModule = true;
var database_1 = require("firebase/database");
var faker_1 = require("@faker-js/faker");
var firebaseConfig_1 = require("../firebaseConfig");
var db = (0, database_1.getDatabase)(firebaseConfig_1.app);
function writeLegendData(legend) {
    (0, database_1.push)((0, database_1.ref)(db, "legends/"), legend);
}
function writeUserData(userId, userObj) {
    (0, database_1.set)((0, database_1.ref)(db, "users/" + userId), userObj);
}
var usersIdArr = [];
var legendCategoryArr = ["myth", "personal", "further_back_history", "recent_history"];
function generateTestUsers(numOfUsers) {
    for (var i = 0; i < numOfUsers; i++) {
        var userId = faker_1.faker.datatype.uuid();
        usersIdArr.push(userId);
        var user = {
            firstName: faker_1.faker.name.firstName(),
            lastName: faker_1.faker.name.lastName(),
            email: faker_1.faker.internet.email(),
            dateOfBirth: faker_1.faker.date.birthdate()
        };
        writeUserData(userId, user);
    }
}
function generateTestLegends(numOfLegends) {
    for (var i = 0; i < numOfLegends; i++) {
        var coordinates = faker_1.faker.address.nearbyGPSCoordinate([53.4808, 2.2426], 2);
        var legend = {
            title: faker_1.faker.lorem.words(Math.floor(Math.random() * 6 + 10)),
            body: faker_1.faker.lorem.words(Math.floor(Math.random() * 150 + 31)),
            legendCategory: legendCategoryArr[Math.floor(Math.random() * legendCategoryArr.length)],
            location: {
                latitude: coordinates[0],
                longitude: coordinates[1]
            }
        };
        writeLegendData(legend);
    }
}
// Seed test DB
// generateTestUsers(3);
generateTestLegends(20);
