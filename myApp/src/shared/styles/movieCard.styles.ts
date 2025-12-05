import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 250,
  },
  noImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
  },
  body: {
    padding: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111",
  },
  rating: {
    fontSize: 12,
    color: "#e5c100",
    marginTop: 2,
  },
});
