import { Marker, Callout } from "react-native-maps";
import { Image, Text } from "react-native";
const LegendMarker = ({ index, item, onMarkerPress }) => {
  return (
    <Marker
      onPress={(event) => {
        onMarkerPress(item);
      }}
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
      </Callout>
    </Marker>
  );
};

export default LegendMarker;
