import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userCard: {
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#374151",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    width: "100%",
  },
  statItem: {
    alignItems: "flex-start",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  viewFavButton: {
    backgroundColor: "#eef2ff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  viewFavButtonText: {
    color: "#3730a3",
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#e50914",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  loadingText: {
    color: "#555",
    fontSize: 18,
  },
});
