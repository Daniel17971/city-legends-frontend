import { NavigationContainer } from "@react-navigation/native";
import LegendPage from "./LegendPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./Map";
import FormMap from "./FormMap";
import { useContext } from "react";
import { DiscoveryContext } from "../contexts/discovery";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="LegendPage" component={LegendPage} />
        <Stack.Screen name="FormMap" component={FormMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
