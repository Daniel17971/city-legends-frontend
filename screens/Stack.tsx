import { NavigationContainer } from "@react-navigation/native";
import LegendPage from "./LegendPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./Map";
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
