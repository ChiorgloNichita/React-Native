import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { CARD_WIDTH } from "../../src/shared/styles/searchIndex.styles";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Делаем задержку перед запросом (debounce)
  const delayedSearch = useCallback(
    debounce((text: string) => {
      if (text.trim().length > 0) searchMovies(text);
      else setMovies([]);
    }, 600),
    []
  );

  const handleChange = (text: string) => {
    setQuery(text);
    delayedSearch(text);
  };

  const searchMovies = async (text: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${encodeURIComponent(
          text
        )}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Ошибка поиска:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMovieCard = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => router.push(`/movie/${item.id}`)}
      style={styles.card}
    >
      {item.poster_path ? (
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.noPoster}>
          <Text style={{ color: "#777" }}>Нет постера</Text>
        </View>
      )}

      <Text numberOfLines={2} style={styles.cardTitle}>
        {item.title}
      </Text>
    </Pressable>
  );

  const renderEmptyComponent = () =>
    !loading && movies.length === 0 && query.trim().length > 0 ? (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>Ничего не найдено 😔</Text>
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Поиск</Text>

        {/* Поле ввода */}
        <TextInput
          placeholder="Введите название фильма..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleChange}
          style={styles.input}
        />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#e50914" />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}



// 🔹 Простая debounce-функция
// 🔹 Простая debounce-функция для React Native
function debounce(func: (...args: any[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>; // ✅ Исправлено
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
