import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = (width - 48) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerRow: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 6 },
  title: { fontSize: 22, fontWeight: "800", color: "#111", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111",
    backgroundColor: "#fafafa",
  },
  loadingWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: CARD_WIDTH,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  imageWrap: { width: "100%", height: 240, overflow: "hidden" },
  image: { width: "100%", height: "100%" },
  noPoster: {
    width: "100%",
    height: 240,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: { padding: 10, fontSize: 14, fontWeight: "700", color: "#111" },
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 50 },
  emptyText: { color: "#666" },
  columnWrapper: { justifyContent: "space-between", paddingHorizontal: 16 },
  listContent: { paddingTop: 12, paddingBottom: 40 },
});

export default styles;
