import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../../src/pages/home/ui/HomeScreen";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top", "left", "right"]}>
      <HomeScreen />
    </SafeAreaView>
  );
}
