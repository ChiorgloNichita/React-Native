import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../styles/movieCarousel.styles";
import type { MovieCardType } from "./MovieCard";

interface Props {
  data: MovieCardType[];
}

export default function MovieCarousel({ data }: Props) {
  const router = useRouter();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((movie: MovieCardType) => (
        <Pressable
          key={movie.id}
          onPress={() => router.push(`/movie/${movie.id}`)}
          style={styles.card}
        >
          {movie.poster_path ? (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.image}
            />
          ) : (
            <View style={styles.noPoster}>
              <Text style={styles.noPosterText}>Нет постера</Text>
            </View>
          )}

          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
