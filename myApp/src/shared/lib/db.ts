import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("movies.db");

// ▶️ Инициализация базы — теперь есть user_id
export async function initDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER NOT NULL,
      title TEXT NOT NULL,
      poster_path TEXT,
      user_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id, user_id)
    );
  `);

  console.log("✅ Таблица favorites (с user_id) готова");
}

// ▶️ Добавить в избранное
export async function addFavorite(
  movie: { id: number; title: string; poster_path: string | null },
  userId: string
) {
  await db.runAsync(
    `INSERT OR REPLACE INTO favorites (id, title, poster_path, user_id) VALUES (?, ?, ?, ?);`,
    [movie.id, movie.title, movie.poster_path, userId]
  );

  console.log(`❤️ Добавлено в избранное (${userId}):`, movie.title);
}

// ▶️ Удалить из избранного
export async function removeFavorite(id: number, userId: string) {
  await db.runAsync(
    `DELETE FROM favorites WHERE id = ? AND user_id = ?;`,
    [id, userId]
  );

  console.log(`💔 Удалено из избранного (${userId}):`, id);
}

// ▶️ Получить избранное пользователя
export async function getFavorites(userId: string) {
  const result = await db.getAllAsync(
    `SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC;`,
    [userId]
  );
  return result;
}

// ▶️ Проверить, находится ли фильм в избранном пользователя
export async function isFavorite(id: number, userId: string) {
  const result = await db.getFirstAsync(
    `SELECT id FROM favorites WHERE id = ? AND user_id = ?;`,
    [id, userId]
  );
  return !!result;
}
