import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser, logout } from "../../../features/auth/lib/storage";
import { getFavorites } from "../../../shared/lib/db";
import { profileStyles } from "../../../shared/styles/profile.styles";
import { User } from "../../../shared/types/user.types";

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
      if (u) {
        const favs = await getFavorites(u.email);
        setFavoritesCount(Array.isArray(favs) ? favs.length : 0);
      }
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
        <View style={profileStyles.userCard}>
          <View style={profileStyles.avatar}>
            <Text style={profileStyles.avatarText}>{user.name ? user.name[0].toUpperCase() : "U"}</Text>
          </View>

          <Text style={profileStyles.userName}>Привет, {user.name}!</Text>
          <Text style={profileStyles.userEmail}>{user.email}</Text>

          <View style={profileStyles.statsRow}>
            <View style={profileStyles.statItem}>
              <Text style={profileStyles.statNumber}>{favoritesCount}</Text>
              <Text style={profileStyles.statLabel}>Избранное</Text>
            </View>
            <Pressable style={profileStyles.viewFavButton} onPress={() => router.push('/favorites')}>
              <Text style={profileStyles.viewFavButtonText}>Посмотреть</Text>
            </Pressable>
          </View>

          <Pressable onPress={handleLogout} style={profileStyles.logoutButton}>
            <Text style={profileStyles.logoutButtonText}>Выйти</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={profileStyles.loadingText}>Загрузка...</Text>
      )}
    </SafeAreaView>
  );
}
