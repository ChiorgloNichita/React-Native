import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../styles/movieCard.styles";

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
