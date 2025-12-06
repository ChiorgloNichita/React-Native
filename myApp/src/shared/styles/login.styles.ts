import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    textAlign: "center",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  error: {
    color: "#e50914",
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#e50914",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "#555",
    textAlign: "center",
    marginTop: 16,
    fontSize: 15,
  },
  linkAction: {
    color: "#007bff",
    fontWeight: "600",
  },
});

export default styles;