import { useRouter } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  overview?: string;
};

export default function Hero({ movie }: { movie: Movie | undefined }) {
  const router = useRouter();

  if (!movie) return null;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/movie/[id]",
          params: { id: String(movie.id) },
        })
      }
    >
      <ImageBackground
        source={{
          uri: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
            : "https://dummyimage.com/1200x600/1f2937/ffffff&text=MovieApp",
        }}
        style={styles.heroImage}
        resizeMode="cover"
      >
        {/* Затемнение снизу */}
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>

          {movie.overview ? (
            <Text style={styles.overview} numberOfLines={2}>
              {movie.overview}
            </Text>
          ) : null}

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.watchButton]}
              onPress={() =>
                router.push({
                  pathname: "/movie/[id]",
                  params: { id: String(movie.id) },
                })
              }
            >
              <Text style={styles.buttonText}>▶ Смотреть</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.infoButton]}>
              <Text style={styles.buttonText}>ℹ Подробнее</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: "100%",
    height: 260,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  content: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  overview: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
  },
  watchButton: {
    backgroundColor: "#e50914",
  },
  infoButton: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
