import { StyleSheet } from "react-native";

export const movieDetailStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  loadingText: {
    color: "#555",
    marginTop: 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  errorText: {
    color: "#e50914",
    fontSize: 18,
  },

  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  banner: {
    width: "100%",
    height: 350,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
  },

  subtitle: {
    color: "#666",
    marginTop: 4,
    fontSize: 16,
  },

  genres: {
    color: "#999",
    marginTop: 6,
  },

  description: {
    color: "#333",
    marginTop: 14,
    lineHeight: 22,
    fontSize: 16,
  },

  trailerBlock: {
    marginTop: 24,
  },

  trailerTitle: {
    color: "#111",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },

  favoriteButton: {
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  favoriteButtonActive: {
    backgroundColor: "#777",
  },

  favoriteButtonInactive: {
    backgroundColor: "#e50914",
  },

  favoriteButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  backButton: {
    marginTop: 15,
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  backButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
