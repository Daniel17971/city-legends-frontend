import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

function Map() {
  const onRegionChange = (region) => {};
  const [location, setLocation] = useState(null);
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const latitudeDelta = 0.02;
  const longitudeDelta = latitudeDelta * aspectRatio;
  const radius = 600;

  const [initialPosition, setInitialPosition] = useState(null);
  const [filteredLocations, setFilteredLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c",
        },
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d",
        },
      ],
    },
  ];

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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>... is loading</Text>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialPosition}
          onRegionChange={onRegionChange}
          showsUserLocation={true}
          customMapStyle={mapStyle}
        >
          {filteredLocations
            ? filteredLocations.map((item, index) => {
                return (
                  <Marker
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
});
