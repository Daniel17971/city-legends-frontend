import {
  Button,
  Dimensions,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { googleApiKey } from "../env";
import mapStyle from "../assets/mapStyle.js";
import { styles } from "../styles/styles";
// import  MarkerClusterer  from "react-native-map-clustering"


// new MarkerClusterer(listOfLocations, Map)

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
        <View style={styles.mapLoadingContainer}>
          <Text>Loading map</Text>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      ) : (
        <View>
          <View>
            <ActivityIndicator animating={false} />
          </View>
          {isRoutePressed ? (
            <View style={styles.postRouteForm}>
              <TextInput
                value={newName}
                onChangeText={setNewName}
                placeholder="Route name"
                style={styles.routeNameInput}
              />
              {hasSubmitted ? (
                <View style={styles.formButtons}>
                  <View>
                    <Button title={"Confirm"} onPress={onConfirmPress} />
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.formButtons}>
                    <View>
                      <Button title={"Submit"} onPress={onSubmitPress} />
                    </View>
                  </View>
                </>
              )}
              <>
                <View style={styles.formButtons}>
                  <View >
                    <Button title={"Cancel"} onPress={onCancelPress} />
                  </View>
                </View>
              </>
            </View>
          ) : (
            <View style={styles.formButtons}>
              <Button title={"Create route"} onPress={onRoutePress} />
            </View>
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
                      <Callout>
                        <Text>{item.title}</Text>
                        {/* <Image
                          source={require("../assets/image1.png")}
                          style={{ height: 35, width: 35, borderRadius: 50 }}            
                        /> */}
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
