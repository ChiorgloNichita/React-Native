import { CONFIG } from "../../shared/config";
import axios from "axios";

const api = axios.create({ baseURL: CONFIG.apiBase });

api.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    api_key: CONFIG.apiKey,
    language: "ru-RU",
  };
  return config;
});

export const MovieAPI = {
  search: (q: string) =>
    api.get("/search/movie", { params: { query: q } }).then((r) => r.data),
};
