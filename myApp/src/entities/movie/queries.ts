import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = "d425a67d3cf50a745ea99f892ebb24f7"; // 🔑 сюда вставь свой ключ TMDB
const BASE_URL = "https://api.themoviedb.org/3";

export const useSearchMovies = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return { results: [] };
      const res = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ru-RU`
      );
      return res.data;
    },
    enabled: !!query,
  });

export const usePopularMovies = () =>
  useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU`
      );
      return res.data;
    },
  });
