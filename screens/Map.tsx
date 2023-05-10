import {
  Button,
  Dimensions,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Circle } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { googleApiKey } from "../env";
import mapStyle from "../assets/mapStyle.js";
import Slider from "@react-native-community/slider";
import LegendMarker from "./LegendMarker";
import { read } from "react-native-fs";
import { styles } from "../styles/styles";

import { getLegends, getRoutes } from "../db/api";
import { postRoutes } from "../db/api";

import { DiscoveryContext } from "../contexts/discovery";
import DiscoveryMap from "./DiscoveryMap";
import { getDistanceFromLatLonInKm, objToArr } from "../ultils/utils";
// import  MarkerClusterer  from "react-native-map-clustering"

// new MarkerClusterer(listOfLocations, Map)

function Map({ navigation }) {
  const { discoveryModeStatus } = useContext(DiscoveryContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [slidingDone, setSlidingDone] = useState(true);
  const [routeList, setRouteList] = useState([]);

  const [newName, setNewName] = useState("");
  const [isRoutePressed, setIsRoutePressed] = useState(false);
  const [newRouteObj, setNewRouteObj] = useState({});
  const onRegionChange = (region) => {};
  const [location, setLocation] = useState(null);
  const [selectedLegend, setSelectedLegend] = useState(null);
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;

  const [radius, setRadius] = useState(1);
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
        setInitialPosition((currentPostition) => {
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
          getRoutes().then((data) => objToArr(data)),
          data,
        ]);
      })
      .then((legends) => {
        setRouteList(legends[1]);
        setFilteredLocations((currentFilteredLocations) => {
          return legends[0].filter((item) => {
            item["location"].latitude = +item["location"].latitude;
            item["location"].longitude = +item["location"].longitude;

            return (
              radius >
              getDistanceFromLatLonInKm(
                legends[2].coords.latitude,
                legends[2].coords.longitude,
                item["location"].latitude,
                item["location"].longitude
              )
            );
          });
        });
      });
  }, [setLocation, setInitialPosition, setFilteredLocations, slidingDone]);

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
      postRoutes(newRouteObj).catch((err) => {
        // Reset routelist in case of error
        setRouteList((routeList) => {
          return routeList.slice(0, -1);
        });
      });
      setRouteList((routeList) => {
        return [...routeList, newRouteObj];
      });
      setNewRouteObj({});

      setHasSubmitted(false);
      setIsRoutePressed(false);
    } else return;
  };

  return discoveryModeStatus ? (
    <DiscoveryMap navigation />
  ) : (
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
                  if (item.legendCategory === "myth") {
                    item.image = "../assets/myth.png";
                  } else if (item.legendCategory === "personal") {
                    item.image = "../assets/personal.png";
                  } else if (item.legendCategory === "further_back_history") {
                    item.image = "../assets/ancientHistory.png";
                  } else if (item.legendCategory === "recent_history") {
                    item.image = "../assets/recent_history.png";
                  }
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
            {location ? (
              <Circle
                center={{
                  latitude: location["coords"]["latitude"],
                  longitude: location["coords"]["longitude"],
                }}
                radius={radius * 1000}
                strokeColor="red"
                strokeWidth={5}
              />
            ) : null}
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
        </View>
      )}
    </View>
  );
}

export default Map;
