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
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

import { getCurrentUser } from "../../../features/auth/lib/storage";
import { addFavorite, isFavorite, removeFavorite } from "../../../shared/lib/db";
import { MovieDetail } from "../../../shared/types/movie.types";

import { movieDetailStyles } from "../../../shared/styles/movieDetail.styles";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
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

  // Изменение избранного
  const toggleFavorite = async () => {
    try {
      const user = await getCurrentUser();
      if (!user || !movie) return;

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
      <View style={movieDetailStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={movieDetailStyles.loadingText}>Загрузка фильма...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={movieDetailStyles.errorContainer}>
        <Text style={movieDetailStyles.errorText}>Не удалось загрузить фильм 😢</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={movieDetailStyles.safeArea}>
      <ScrollView style={movieDetailStyles.scroll}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        }}
        style={movieDetailStyles.banner}
      />

      <View style={movieDetailStyles.content}>
        <Text style={movieDetailStyles.title}>{movie.title}</Text>

        <Text style={movieDetailStyles.subtitle}>
          {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average?.toFixed(1)}
        </Text>

        {movie.genres && (
          <Text style={movieDetailStyles.genres}>
            {movie.genres.map((g) => g.name).join(", ")}
          </Text>
        )}

        <Text style={movieDetailStyles.description}>
          {movie.overview || "Описание отсутствует."}
        </Text>

        {movie.videos?.results && movie.videos.results.length > 0 && (
          <View style={movieDetailStyles.trailerBlock}>
            <Text style={movieDetailStyles.trailerTitle}>Трейлер</Text>
            <YoutubePlayer height={220} videoId={movie.videos.results[0].key} />
          </View>
        )}

        <Pressable
          onPress={toggleFavorite}
          style={[
            movieDetailStyles.favoriteButton,
            favorite
              ? movieDetailStyles.favoriteButtonActive
              : movieDetailStyles.favoriteButtonInactive,
          ]}
        >
          <Text style={movieDetailStyles.favoriteButtonText}>
            {favorite ? " Удалить из избранного" : " Добавить в избранное"}
          </Text>
        </Pressable>

        <Pressable
          style={movieDetailStyles.backButton}
          onPress={() => router.back()}
        >
          <Text style={movieDetailStyles.backButtonText}>← Назад</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
