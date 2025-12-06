import { useRouter } from "expo-router";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "../styles/heroCarousel.styles";
import { Movie } from "../types/movie.types";

export default function HeroCarousel({ movies }: { movies: Movie[] }) {
  const router = useRouter();

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
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
