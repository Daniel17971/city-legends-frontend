import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#2E2E9F",
  },
  loadingPage: {
    flex: 1,
    backgroundColor: "#2E2E9F",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
  },
  loadingText:{
    fontFamily: "Poppins-Black",
    fontSize: 30,
    textAlign: "center",
    color: "#FFE11B",
  },
  list: {
    margin: 5,
    justifyContent: "center",
    borderColor: "red",
    backgroundColor: "#FF7700",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins-Light",
    fontSize: 16,
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFE11B",
    fontFamily: "Poppins-Black",
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFE11B",
    fontFamily: "Poppins-Light",
  },
});
