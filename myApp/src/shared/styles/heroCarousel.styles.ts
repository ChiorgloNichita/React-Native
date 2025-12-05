import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  slide: {
    width,
    height: 460,
    justifyContent: "flex-end",
  },
  darkLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  textContainer: {
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "800",
  },
  desc: {
    color: "#ddd",
    marginTop: 8,
    fontSize: 14,
  },
  watchButton: {
    marginTop: 14,
    backgroundColor: "#e50914",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  watchText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
