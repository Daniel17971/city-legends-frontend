import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2E2E9F",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  discoveryModeOn: {
    margin: 15,
    padding: 10,
    backgroundColor: "#FFE11B",
    height: "20%",
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  discoveryModeOff: {
    margin: 15,
    padding: 10,
    backgroundColor: "#FF7700",
    height: "20%",
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  cityLogo: {
    width: "50%",
    height: "30%",
    borderRadius: 50,
  },
  discoveryModeText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Poppins-Black",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
