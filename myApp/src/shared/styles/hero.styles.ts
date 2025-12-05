import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heroImage: {
    width: "100%",
    height: 260,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  content: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  overview: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
  },
  watchButton: {
    backgroundColor: "#e50914",
  },
  infoButton: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
