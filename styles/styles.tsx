import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  mapLoadingContainer: {
    top:0,
    right:0,
    left:0,
    bottom: 0,
    position:"absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  highlightedContainer: {
    color: "blue",
  },
  postRouteForm: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    width: "50%",
    marginVertical: 0,
  },
  routeNameInput: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  formButtons: {
    justifyContent: "space-evenly",
    borderRadius: 20,
    padding: 5,
  },

  submitbtn: {
    width: "50%",
    padding: 5,
    borderRadius: 50,
  },
  cancelbtn: {
    width: "50%",
    padding: 5,
    borderRadius: 50,
  },
});
