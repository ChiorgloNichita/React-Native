import { StyleSheet } from "react-native";

export const searchStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchWrap: { paddingHorizontal: 16, paddingTop: 12 },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  loadingWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  columnWrapper: { justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 12 },
  listContent: { paddingTop: 12, paddingBottom: 40 },
  card: { marginBottom: 18, borderRadius: 12, overflow: "hidden", backgroundColor: "#fff" },
  poster: { width: "100%", height: 220, backgroundColor: "#eaeaea" },
  noPoster: { justifyContent: "center", alignItems: "center" },
  noPosterText: { color: "#777" },
  titleText: { padding: 8, fontSize: 14, fontWeight: "600", color: "#111" },
  emptyWrap: { padding: 24, alignItems: "center" },
  emptyText: { color: "#777" },
});
