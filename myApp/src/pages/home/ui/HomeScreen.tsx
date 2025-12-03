import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import HeroCarousel from "../../../shared/ui/HeroCarousel";
import MovieCarousel from "../../../shared/ui/MovieCarousel";
import { usePopularMovies } from "../../../entities/movie/queries";

export default function HomeScreen() {
  const { data, isLoading, isError } = usePopularMovies();
  const movies = data?.results || [];

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#e50914" />
        <Text className="text-gray-500 mt-3">Загрузка фильмов...</Text>
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500 text-lg">Ошибка при загрузке данных 😢</Text>
      </View>
    );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Большой слайдер */}
      <HeroCarousel movies={movies.slice(0, 6)} />

      {/* Популярные фильмы */}
      <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#111", marginBottom: 10 }}>
          Популярные фильмы
        </Text>
        <MovieCarousel data={movies.slice(6, 16)} />
      </View>

      {/* Рекомендуем */}
      <View style={{ marginTop: 30, paddingHorizontal: 16, marginBottom: 50 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#111", marginBottom: 10 }}>
          Рекомендуем
        </Text>
        <MovieCarousel data={movies.slice(16, 26)} />
      </View>
    </ScrollView>
  );
}
