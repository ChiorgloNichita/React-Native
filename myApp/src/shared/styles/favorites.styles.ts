import { StyleSheet } from "react-native";

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#555",
    fontSize: 18,
  },
  scrollView: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  noPostersContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  noPostersText: {
    color: "#777",
  },
  cardTitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
});
