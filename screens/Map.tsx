import {
  Alert,
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { googleApiKey } from "../env";
import mapStyle from "../assets/mapStyle.js";
import { getLegends } from "../db/api";

function Map() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [routeList, setRouteList] = useState([]);
  const [newName, setNewName] = useState("");
  const [isRoutePressed, setIsRoutePressed] = useState(false);
  const [newRouteObj, setNewRouteObj] = useState({});
  const onRegionChange = (region) => {};
  const [location, setLocation] = useState(null);
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const latitudeDelta = 0.02;
  const longitudeDelta = latitudeDelta * aspectRatio;
  const radius = 6000000;

  const [initialPosition, setInitialPosition] = useState(null);
  const [filteredLocations, setFilteredLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const listOfLocations = [
    {
      title: "test-1",
      location: {
        latitude: 55,
        longitude: 3,
      },
      description: "this is about the test-1 location",
    },
    {
      title: "test-2",
      location: {
        latitude: 45.761499546355104,
        longitude: 4.8555995726222445,
      },
      description: "this is about the test-1 location",
    },
    {
      title: "test-3",
      location: {
        latitude: 55.123213,
        longitude: 3.123212,
      },
      description: "this is about the test-1 location",
    },
    {
      title: "test-4",
      location: {
        latitude: 53.47469237583231,
        longitude: -2.2411665530428904,
      },
      description: "this is about the test-1 location",
    },
    {
      title: "test-5",
      location: {
        latitude: 53.477074583793325,
        longitude: -2.2337428647131357,
      },
      description: "this is about the test-1 location",
    },
    {
      title: "test-6",
      location: {
        latitude: 53.48208743879171,
        longitude: -2.2373735774163372,
      },
      description: "this is about the test-1 location",
    },
  ];

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
        setFilteredLocations((currentFilteredLocations) => {
          return listOfLocations.filter((item) => {
            return (
              radius >
              getDistanceFromLatLonInKm(
                data.coords.latitude,
                data.coords.longitude,
                item.location.latitude,
                item.location.longitude
              )
            );
          });
        });
        return setInitialPosition((currentPostition) => {
          return {
            latitudeDelta,
            longitudeDelta,
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          };
        });
      });
  }, [setLocation, setInitialPosition]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const onRoutePress = () => {
    setIsRoutePressed(true);
  };

  const onCancelPress = () => {
    setIsRoutePressed(false);
    setNewRouteObj({});
  };

  const onMarkerPress = (item) => {
    if (isRoutePressed) {
      if (!newRouteObj.hasOwnProperty("origin")) {
        setNewRouteObj((currentObj) => {
          return { origin: item.location };
        });
      } else if (!newRouteObj.hasOwnProperty("waypoints")) {
        setNewRouteObj((currentObj) => {
          return { ...currentObj, waypoints: [item.location] };
        });
      } else {
        setNewRouteObj((currentObj) => {
          currentObj["waypoints"].push(item.location);
          return { ...currentObj };
        });
      }
    } else {
      return;
    }
  };

  const onSubmitPress = () => {
    if (
      newRouteObj.hasOwnProperty("origin") &&
      newRouteObj.hasOwnProperty("waypoints") &&
      newName.length
    ) {
      setHasSubmitted(true);
      setNewRouteObj((currentObj) => {
        const destination = currentObj["waypoints"].pop();
        const name = newName;
        return { name, ...currentObj, destination };
      });
    } else return;
  };

  const onConfirmPress = () => {
    if (newRouteObj["destination"]) {
      setRouteList((routeList) => {
        return [...routeList, newRouteObj];
      });
      setNewRouteObj({});

      setHasSubmitted(false);
      setIsRoutePressed(false);
    } else return;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>... is loading</Text>
      ) : (
        <View>
          {isRoutePressed ? (
            <View>
              <TextInput
                value={newName}
                onChangeText={setNewName}
                placeholder="Route name"
              />
              {hasSubmitted ? (
                <Button title={"Confirm"} onPress={onConfirmPress} />
              ) : (
                <Button title={"Submit"} onPress={onSubmitPress} />
              )}

              <Button title={"Cancel"} onPress={onCancelPress} />
            </View>
          ) : (
            <Button title={"Create route"} onPress={onRoutePress} />
          )}

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialPosition}
            onRegionChange={onRegionChange}
            customMapStyle={mapStyle}
            showsUserLocation={true}
          >
            {routeList.map((route, index) => {
              return (
                <MapViewDirections
                  key={index}
                  origin={route.origin}
                  waypoints={route.waypoints}
                  mode="WALKING"
                  destination={route.destination}
                  apikey={googleApiKey}
                  strokeWidth={3}
                  strokeColor="blue"
                />
              );
            })}

            {filteredLocations
              ? filteredLocations.map((item, index) => {
                  return (
                    <Marker
                      onPress={(event) => {
                        onMarkerPress(item);
                      }}
                      key={index}
                      coordinate={item.location}
                      style={{ height: 100, width: 100 }}
                    >
                      <Image
                        source={require("../assets/image1.png")}
                        style={{ height: 35, width: 35 }}
                      />
                      <Callout>
                        <Text>{item.title}</Text>
                        <Image
                          source={require("../assets/image1.png")}
                          style={{ height: 35, width: 35 }}
                        />
                        <Text>{item.description}</Text>
                      </Callout>
                    </Marker>
                  );
                })
              : null}
          </MapView>
        </View>
      )}
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  highlightedContainer: {
    color: "blue",
  },
});
