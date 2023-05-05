import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { UserContextProvider } from "./contexts/user";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Map from "./components/Map";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, tabBarStyle: { display: "none" } }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ title: "Home" }}
          />
          <Tab.Screen name="Map" component={Map} options={{ title: "Map" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
