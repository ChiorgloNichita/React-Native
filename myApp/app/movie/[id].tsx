import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from "../../src/shared/lib/db";

import { getCurrentUser } from "../../src/features/auth/lib/storage";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ru-RU&append_to_response=videos`
        );
        const data = await res.json();
        setMovie(data);

        // Проверяем избранное
        const fav = await isFavorite(Number(id), user.email);
        setFavorite(fav);
      } catch (err) {
        console.error("Ошибка загрузки фильма:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // ⭐ Изменение избранного
  const toggleFavorite = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      if (favorite) {
        await removeFavorite(movie.id, user.email);
      } else {
        await addFavorite(
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
          },
          user.email
        );
      }

      setFavorite(!favorite);
    } catch (err) {
      console.error("Ошибка обновления избранного:", err);
    }
  };

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}
      >
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={{ color: "#555", marginTop: 10 }}>Загрузка фильма...</Text>
      </View>
    );
  }

  if (!movie || movie.success === false) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}
      >
        <Text style={{ color: "#e50914", fontSize: 18 }}>Не удалось загрузить фильм 😢</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        }}
        style={{ width: "100%", height: 350 }}
      />

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: "800", color: "#111" }}>{movie.title}</Text>

        <Text style={{ color: "#666", marginTop: 4, fontSize: 16 }}>
          {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average?.toFixed(1)}
        </Text>

        {movie.genres && (
          <Text style={{ color: "#999", marginTop: 6 }}>
            {movie.genres.map((g: any) => g.name).join(", ")}
          </Text>
        )}

        <Text style={{ color: "#333", marginTop: 14, lineHeight: 22, fontSize: 16 }}>
          {movie.overview || "Описание отсутствует."}
        </Text>

        {/* 🎬 Трейлер */}
        {movie.videos?.results?.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text
              style={{
                color: "#111",
                fontWeight: "700",
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              Трейлер
            </Text>
            <YoutubePlayer height={220} videoId={movie.videos.results[0].key} />
          </View>
        )}

        {/* ❤️ Избранное */}
        <Pressable
          onPress={toggleFavorite}
          style={{
            marginTop: 30,
            backgroundColor: favorite ? "#777" : "#e50914",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
            {favorite ? "💔 Удалить из избранного" : "❤️ Добавить в избранное"}
          </Text>
        </Pressable>

        <Pressable
          style={{
            marginTop: 15,
            backgroundColor: "#222",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>← Назад</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
