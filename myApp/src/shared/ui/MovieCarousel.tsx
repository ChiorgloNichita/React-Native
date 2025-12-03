import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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

const styles = StyleSheet.create({
  card: {
    marginRight: 14,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    width: 130,
  },
  image: {
    width: 130,
    height: 190,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noPoster: {
    width: 130,
    height: 190,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noPosterText: {
    color: "#666",
  },
  title: {
    padding: 6,
    fontWeight: "600",
    fontSize: 14,
    color: "#111",
  },
});
