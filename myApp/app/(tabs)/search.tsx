import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchStyles } from "../../src/shared/styles/search.styles";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { width } = Dimensions.get("window");
  const CARD_WIDTH = Math.min(180, (width - 48) / 2);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&language=ru-RU&query=${encodeURIComponent(
              query
            )}`
          );
          const data = await res.json();
          setResults(data.results || []);
        } catch (e) {
          console.error(e);
          setResults([]);
        } finally {
          setLoading(false);
        }
      })();
    }, 600);

    return () => clearTimeout(delay);
  }, [query]);

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => router.push(`/movie/${item.id}`)}
      style={[searchStyles.card, { width: CARD_WIDTH }]}
    >
      {item.poster_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={searchStyles.poster}
        />
      ) : (
        <View style={[searchStyles.poster, searchStyles.noPoster]}>
          <Text style={{ color: "#777" }}>Нет постера</Text>
        </View>
      )}

      <Text numberOfLines={2} style={searchStyles.titleText}>
        {item.title}
      </Text>
    </Pressable>
  );

  const listEmpty = () => (
    <View style={searchStyles.emptyWrap}>
      <Text style={searchStyles.emptyText}>{query ? "Ничего не найдено 😔" : "Начните вводить имя фильма"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={searchStyles.container} edges={["top"]}>
      <View style={searchStyles.searchWrap}>
        <TextInput
          placeholder="Поиск фильмов..."
          value={query}
          onChangeText={setQuery}
          style={searchStyles.input}
          clearButtonMode="while-editing"
        />
      </View>

      {loading ? (
        <View style={searchStyles.loadingWrap}>
          <ActivityIndicator size="large" color="#e50914" />
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(i) => String(i.id)}
          numColumns={2}
          columnWrapperStyle={searchStyles.columnWrapper}
          contentContainerStyle={searchStyles.listContent}
          ListEmptyComponent={listEmpty}
        />
      )}
    </SafeAreaView>
  );
}
