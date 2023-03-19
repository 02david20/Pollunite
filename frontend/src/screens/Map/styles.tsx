import { Dimensions, StyleSheet } from "react-native";

var maxWidth = Dimensions.get("window").width; //full width
var maxHeight = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: maxHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
const markerStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "absolute",
    opacity: 0.5,
    zIndex: 0,
  },
  cluster: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontWeight: "bold",
  },
});

export { styles, markerStyles };
