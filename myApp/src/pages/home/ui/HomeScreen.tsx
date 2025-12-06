import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { usePopularMovies } from "../../../entities/movie/queries";
import { homeStyles } from "../../../shared/styles/home.styles";
import HeroCarousel from "../../../shared/ui/HeroCarousel";
import MovieCarousel from "../../../shared/ui/MovieCarousel";

export default function HomeScreen() {
  const { data, isLoading, isError } = usePopularMovies();
  const movies = data?.results || [];

  if (isLoading)
    return (
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={homeStyles.loadingText}>Загрузка фильмов...</Text>
      </View>
    );

  if (isError)
    return (
      <View style={homeStyles.errorContainer}>
        <Text style={homeStyles.errorText}>Ошибка при загрузке данных 😢</Text>
      </View>
    );

  return (
    <ScrollView
      style={homeStyles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <HeroCarousel movies={movies.slice(0, 6)} />

      <View style={homeStyles.sectionContainer}>
        <Text style={homeStyles.sectionTitle}>
          Популярные фильмы
        </Text>
        <MovieCarousel data={movies.slice(6, 16)} />
      </View>

      <View style={homeStyles.sectionContainerLast}>
        <Text style={homeStyles.sectionTitle}>
          Рекомендуем
        </Text>
        <MovieCarousel data={movies.slice(16, 26)} />
      </View>
    </ScrollView>
  );
}
