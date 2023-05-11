import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContextProvider } from "./contexts/user";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import LoginRegister from "./screens/LoginRegister";
import Map from "./screens/Map";
import User from "./screens/User";
import LegendForm from "./screens/LegendForm";
import MyStack from "./screens/Stack";
import { DiscoveryContextProvider } from "./contexts/discovery";
import LogoutModal from "./components/LogoutModal";

const Tab = createBottomTabNavigator();

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });
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
                } else if (route.name === "Logout") {
                  iconName = focused ? "exit" : "exit";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            {}
            <Tab.Screen
              name="Logout"
              component={LoginRegister}
              options={{
                headerShown: false,
                tabBarStyle: { display: "none" },
              }}
              listeners={{
                tabPress: (e) => {
                  e.preventDefault();
                  setModalVisible((modalState) => !modalState);
                },
              }}
            />
            <Tab.Screen
              name="Home"
              component={Home}
              options={{ title: "Home" }}
            />

            <Tab.Screen
              name="Map"
              component={MyStack}
              options={{ title: "Map"}}
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
          <LogoutModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
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
