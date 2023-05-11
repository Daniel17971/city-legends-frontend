import {
  Button,
  Dimensions,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { googleApiKey } from "../env";
import mapStyle from "../assets/mapStyle.js";
import { getLegends } from "../db/api";
import LegendMarker from "./LegendMarker";
import { styles } from "../styles/mapStyles";

function DiscoveryMap({ navigation }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  console.log("here");
  const [routeList, setRouteList] = useState([]);

  const [newName, setNewName] = useState("");
  const [isRoutePressed, setIsRoutePressed] = useState(false);
  const [newRouteObj, setNewRouteObj] = useState({});
  const onRegionChange = (region) => {};
  const [location, setLocation] = useState(null);
  const [selectedLegend, setSelectedLegend] = useState(null);
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const [discoveredLegends, setDiscoveredLegends] = useState([]);
  const [radius, setRadius] = useState(0.1);
  const latitudeDelta = 0.2 * (radius / 6.5);
  const longitudeDelta = latitudeDelta * aspectRatio;
  const [initialPosition, setInitialPosition] = useState(null);
  const [filteredLocations, setFilteredLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
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
        setInitialPosition((currentPosition) => {
          return {
            latitudeDelta,
            longitudeDelta,
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          };
        });
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
        return setFilteredLocations((currentFilteredLocations) => {
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
      })
      .then(() => {
        setDiscoveredLegends((currentLegends) => {
          if (currentLegends && filteredLocations) {
            return [...currentLegends, ...filteredLocations];
          } else {
            return;
          }
        });
      });
  }, [
    setLocation,
    setInitialPosition,
    setFilteredLocations,
    setDiscoveredLegends,
  ]);

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
    setSelectedLegend(item);
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
                  <View>
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
                    <LegendMarker
                      item={item}
                      index={index}
                      key={index}
                      onMarkerPress={onMarkerPress}
                    />
                  );
                })
              : null}
          </MapView>
          {selectedLegend ? (
            <Button
              title={selectedLegend ? "legend" + selectedLegend.title : ""}
              onPress={() => {
                navigation.navigate("LegendPage", {
                  legend: selectedLegend,
                });
              }}
            />
          ) : null}
        </View>
      )}
    </View>
  );
}

export default DiscoveryMap;
