import { Marker } from "react-native-maps";
import { Image } from "react-native";

const LegendMarker = ({ index, item, onMarkerPress}) => {
  return (
    <Marker
      onPress={(event) => {
        onMarkerPress(item);
      }}
      key={index}
      coordinate={item.location}
      style={{ height: 100, width: 100 }}
    >
      {item.legendCategory === "myth" ? (
        <Image
          source={require("../assets/myth.png")}
          style={{ height: 35, width: 35 }}
        />
      ) : item.legendCategory === "personal" ? (
        <Image
          source={require("../assets/personal.png")}
          style={{ height: 35, width: 35 }}
        />
      ) : item.legendCategory === "further_back_history" ? (
        <Image
          source={require("../assets/ancientHistory.png")}
          style={{ height: 35, width: 35 }}
        />
      ) : item.legendCategory === "recent_history" ? (
        <Image
          source={require("../assets/modernHistory.png")}
          style={{ height: 35, width: 35 }}
        />
      ) : null}
    </Marker>
  );
};

export default LegendMarker;
