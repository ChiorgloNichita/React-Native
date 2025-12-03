import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export interface MovieCardType {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

interface Props {
  movie: MovieCardType;
}

export default function MovieCard({ movie }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/movie/${movie.id}`)}
      >
        {movie.poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>Нет постера</Text>
          </View>
        )}

        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
          <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 250,
  },
  noImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
  },
  body: {
    padding: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111",
  },
  rating: {
    fontSize: 12,
    color: "#e5c100",
    marginTop: 2,
  },
});
