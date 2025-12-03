import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { getCurrentUser, logout } from "../../../features/auth/lib/storage";

export default function Profile() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleLogout = async () => {
    await logout(); // 👈 правильная функция
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      {user ? (
        <>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Привет, {user.name}!
          </Text>
          <Text className="text-gray-500 mb-6">{user.email}</Text>

          <Pressable
            onPress={handleLogout}
            className="bg-red-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold text-lg">Выйти</Text>
          </Pressable>
        </>
      ) : (
        <Text className="text-lg text-gray-500">Загрузка...</Text>
      )}
    </View>
  );
}
