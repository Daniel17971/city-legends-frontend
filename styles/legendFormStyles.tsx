import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
    borderColor: "#FFE11B",
    backgroundColor: "#2E2E9F",
  },
  formContainer: {
    height: "90%",
    width: "90%",
  },
  inputsContainer: {
    zIndex: 9999,
    width: "90%",
    alignSelf: "center",
  },
  chooseLocation: {
    fontFamily: "Poppins-Regular",
    color: "#FFE11B",
    zIndex: 1,
    padding: 0,
    alignSelf: "center",
  },
  mapContainer: {
    height: "57%",
    width: "100%",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "30%",
  },
  input: {
    fontFamily: "Poppins-Regular",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 2.5,
    marginBottom: 2.5,
  },
  button: {
    fontFamily: "Poppins-Black",
    backgroundColor: "#FF7700",
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Black",
  },
});
