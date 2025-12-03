import { useRouter } from "expo-router";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HeroCarousel({ movies }: { movies: any[] }) {
  const router = useRouter();

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ height: 460 }}
    >
      {movies.map((item) => (
        <Pressable key={item.id}>
          <ImageBackground
            source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }}
            style={styles.slide}
          >
            <View style={styles.darkLayer} />

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {item.overview}
              </Text>

              <Pressable
                onPress={() => router.push(`/movie/${item.id}`)}
                style={styles.watchButton}
              >
                <Text style={styles.watchText}>Смотреть</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height: 460,
    justifyContent: "flex-end",
  },
  darkLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  textContainer: {
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "800",
  },
  desc: {
    color: "#ddd",
    marginTop: 8,
    fontSize: 14,
  },
  watchButton: {
    marginTop: 14,
    backgroundColor: "#e50914",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  watchText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
