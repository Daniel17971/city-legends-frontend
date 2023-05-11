import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#2e2e9f",
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
    width: "97%",
    height: "72%",
    marginBottom: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 15,
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  span: {
    color: "#ffe11b",
    fontSize: 17,
    width: "40%",
    fontFamily: "Poppins-Light"
  },
  slider: {
    width: 200,
    height: 40,
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
    width: "98%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: "1%",
  },

  formButtons: {
    backgroundColor: "#ffe11b",
    width: "80%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  submitBtn: {
    width: "49%",
    marginLeft: "1%"
  },
  cancelBtn: {
    width: "49%"
  },
  confirmBtn: {
    width: "49%"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Black"
  },
});
