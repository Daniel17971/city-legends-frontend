import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import Home from "./components/Home";
import Map from "./components/Map";
import Route from "./components/Routes";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ title: "Home" }}
          />
          <Tab.Screen name="Map" component={Map} options={{ title: "Map" }} />
          <Tab.Screen
            name="Route"
            component={Route}
            options={{ title: "Route" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
