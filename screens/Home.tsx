import { Pressable, ScrollView, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { UserContext } from "../contexts/user";
import { useContext } from "react";
import { getLegends } from "../db/api";
import * as Location from "expo-location";
import { getDistanceFromLatLonInKm } from "../utils/utils";

function Home({ navigation }) {
  const { userEmail } = useContext(UserContext);
  const [radius, setRadius] = useState(1);
  const [slidingDone, setSlidingDone] = useState(true);
  const [location, setLocation] = useState(null);
  const [filteredLegends, setFilteredLegends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          console.log("please grant permission");
          return;
        }
      })
      .then(() => {
        return Location.getCurrentPositionAsync();
      })
      .then((data) => {
        setLocation(data);
        return data;
      })
      .then((data) => {
        setIsLoading(false);

        return data;
      })
      .then((data) => {
        return Promise.all([
          getLegends().then((data) => {
            return Object.values(data);
          }),
          data,
        ]);
      })
      .then((legends) => {
        setFilteredLegends((currentFilteredLocations) => {
          return legends[0].filter((item) => {
            item["location"].latitude = +item["location"].latitude;
            item["location"].longitude = +item["location"].longitude;

            return (
              radius >
              getDistanceFromLatLonInKm(
                legends[1].coords.latitude,
                legends[1].coords.longitude,
                item["location"].latitude,
                item["location"].longitude
              )
            );
          });
        });
      });
  }, [setLocation, , setFilteredLegends, slidingDone]);

  return isLoading ? (
    <Text>is Loading ...</Text>
  ) : (
    <View>
      <Text className="mt-2 text-lg text-black dark:text-white">
        Welcome {userEmail} These are your local City Legends !
      </Text>
      <Text>radius : {radius} km</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        value={radius}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(event) => {
          setRadius(event);
        }}
        onSlidingComplete={(event) => {
          setSlidingDone((currentValue) => {
            if (currentValue) {
              return false;
            } else {
              return true;
            }
          });
        }}
      />
      <ScrollView>
        {filteredLegends.map((legend, index) => {
          return (
            <View key={index}>
              <Text>{legend.title}</Text>
              <Text>
                You are{" "}
                {getDistanceFromLatLonInKm(
                  location.coords.latitude,
                  location.coords.longitude,
                  legend.location.latitude,
                  legend.location.longitude
                )}
                km from {legend.title}
              </Text>
              <Text>{legend.description}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Home;
