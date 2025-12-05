import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser, logout } from "../../../features/auth/lib/storage";
import { profileStyles } from "../../../shared/styles/profile.styles";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={profileStyles.container}
    >
      {user ? (
        <View style={profileStyles.userInfoContainer}>
          <Text style={profileStyles.userName}>
            Привет, {user.name}!
          </Text>
          <Text style={profileStyles.userEmail}>
            {user.email}
          </Text>

          <Pressable
            onPress={handleLogout}
            style={profileStyles.logoutButton}
          >
            <Text style={profileStyles.logoutButtonText}>
              Выйти
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text style={profileStyles.loadingText}>Загрузка...</Text>
      )}
    </SafeAreaView>
  );
}
