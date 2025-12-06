import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser } from "../../../features/auth/lib/storage";
import { getFavorites } from "../../../shared/lib/db";
import { favoritesStyles } from "../../../shared/styles/favorites.styles";
import { FavoriteMovie } from "../../../shared/types/user.types";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const user = await getCurrentUser();
        if (!user) return;

        const favs = await getFavorites(user.email);
        setFavorites(favs as FavoriteMovie[]);
      };

      loadFavorites();
    }, [])
  );

  return (
    <SafeAreaView style={favoritesStyles.container} edges={["top", "left", "right"]}>
      {favorites.length === 0 ? (
        <View style={favoritesStyles.emptyContainer}>
          <Text style={favoritesStyles.emptyText}>
            Нет избранных фильмов 😔
          </Text>
        </View>
      ) : (
        <ScrollView style={favoritesStyles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={favoritesStyles.headerTitle}>
             Избранное
          </Text>

          <View
            style={favoritesStyles.gridContainer}
          >
            {favorites.map((movie) => (
              <Pressable
                key={movie.id}
                onPress={() => router.push(`/movie/${movie.id}`)}
                style={favoritesStyles.card}
              >
                {movie.poster_path ? (
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }}
                    style={favoritesStyles.cardImage}
                  />
                ) : (
                  <View
                    style={favoritesStyles.noPostersContainer}
                  >
                    <Text style={favoritesStyles.noPostersText}>Нет постера</Text>
                  </View>
                )}
                <Text
                  numberOfLines={2}
                  style={favoritesStyles.cardTitle}
                >
                  {movie.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
