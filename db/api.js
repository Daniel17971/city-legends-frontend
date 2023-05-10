"use strict";
exports.__esModule = true;
exports.getRoutes = exports.postRoutes = exports.getLegendById = exports.postLegend = exports.getLegends = void 0;
var database_1 = require("firebase/database");
var firebaseConfig_1 = require("../firebaseConfig");
var db = (0, database_1.getDatabase)(firebaseConfig_1.app);
var getLegends = function () {
    return (0, database_1.get)((0, database_1.child)((0, database_1.ref)(db), "/legends"))
        .then(function (snapshot) {
        if (snapshot.exists()) {
            return snapshot.val();
        }
        else {
            console.log("No data found");
        }
    })["catch"](function (error) {
        console.error(error);
    });
};
exports.getLegends = getLegends;
var postLegend = function (legend) {
    return (0, database_1.push)((0, database_1.ref)(db, "legends/"), legend).then(function (response) {
        console.log(response);
    })["catch"](function (error) { return alert(error); });
};
exports.postLegend = postLegend;
var getLegendById = function (id) {
    return (0, database_1.get)((0, database_1.child)((0, database_1.ref)(db), "/legends/".concat(id)))
        .then(function (snapshot) {
        if (snapshot.exists()) {
            return snapshot.val();
        }
        else {
            console.log("No data found");
        }
    })["catch"](function (error) {
        console.error(error);
    });
};
exports.getLegendById = getLegendById;
var postRoutes = function (route) {
    return (0, database_1.push)((0, database_1.ref)(db, "routes/"), route).then(function (response) {
        console.log(response);
    })["catch"](function (error) { return alert(error); });
};
exports.postRoutes = postRoutes;
var getRoutes = function () {
    return (0, database_1.get)((0, database_1.child)((0, database_1.ref)(db), "/routes"))
        .then(function (snapshot) {
        if (snapshot.exists()) {
            return snapshot.val();
        }
        else {
            console.log("No data found");
        }
    })["catch"](function (error) {
        console.error(error);
    });
};
exports.getRoutes = getRoutes;
(0, exports.getRoutes)().then(function (data) { return console.log(data); });
