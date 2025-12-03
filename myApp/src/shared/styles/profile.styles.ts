import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userInfoContainer: {
    marginTop: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
    marginTop: 6,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#e50914",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
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
