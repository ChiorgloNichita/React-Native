import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "current_user";

export async function addUser(user: any) {
  const users = JSON.parse((await AsyncStorage.getItem(USERS_KEY)) || "[]");
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function findUser(email: string, password: string) {
  const users = JSON.parse((await AsyncStorage.getItem(USERS_KEY)) || "[]");
  return users.find((u: any) => u.email === email && u.password === password);
}

export async function setCurrentUser(user: any) {
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export async function getCurrentUser() {
  const data = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function logout() {
  // ✅ просто очищаем текущего пользователя
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}
