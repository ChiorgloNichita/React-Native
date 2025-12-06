import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MoviesResponse } from "../../shared/types/movie.types";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const useSearchMovies = (query: string) =>
  useQuery<MoviesResponse>({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return { results: [], page: 1, total_pages: 0, total_results: 0 };
      const res = await axios.get<MoviesResponse>(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ru-RU`
      );
      return res.data;
    },
    enabled: !!query,
  });

export const usePopularMovies = () =>
  useQuery<MoviesResponse>({
    queryKey: ["popular"],
    queryFn: async () => {
      const res = await axios.get<MoviesResponse>(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU`
      );
      return res.data;
    },
  });
