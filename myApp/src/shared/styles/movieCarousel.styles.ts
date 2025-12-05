import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginRight: 14,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    width: 130,
  },
  image: {
    width: 130,
    height: 190,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noPoster: {
    width: 130,
    height: 190,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noPosterText: {
    color: "#666",
  },
  title: {
    padding: 6,
    fontWeight: "600",
    fontSize: 14,
    color: "#111",
  },
});
