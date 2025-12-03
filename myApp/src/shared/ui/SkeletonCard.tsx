import { StyleSheet, View } from "react-native";

export default function SkeletonCard() {
  return <View style={styles.skeleton} />;
}

const styles = StyleSheet.create({
  skeleton: {
    width: 140,
    height: 210,
    marginRight: 16,
    backgroundColor: "rgba(200,200,200,0.4)",
    borderRadius: 12,
  },
});
