export interface User {
  email: string;
  name: string;
  password?: string;
}

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string | null;
  user_id: string;
  created_at?: string;
}
