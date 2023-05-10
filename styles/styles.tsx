import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  mapLoadingContainer: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "70%",
  },
  postRouteForm: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
    marginVertical: 0,
  },
  routeNameInput: {
    width: "50%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  formButtons: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    borderRadius: 0,
    padding: 5,
  },
});
