import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContextProvider } from "./contexts/user";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Map from "./screens/Map";
import User from "./screens/User";
import LegendForm from "./screens/LegendForm";
import MyStack from "./screens/Stack";
import { DiscoveryContextProvider } from "./contexts/discovery";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <DiscoveryContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home";
                } else if (route.name === "Map") {
                  iconName = focused ? "map" : "map";
                } else if (route.name === "User") {
                  iconName = focused ? "person" : "person";
                } else if (route.name === "LegendForm") {
                  iconName = focused ? "add" : "add";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
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

            <Tab.Screen
              name="Map"
              component={MyStack}
              options={{ title: "Map" }}
            />
            <Tab.Screen
              name="LegendForm"
              component={LegendForm}
              options={{ title: "Create Legend" }}
            />
            <Tab.Screen
              name="User"
              component={User}
              options={{ title: "User" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DiscoveryContextProvider>
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
