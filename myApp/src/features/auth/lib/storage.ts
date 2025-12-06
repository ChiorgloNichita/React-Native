import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../../shared/types/user.types";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "current_user";

export async function addUser(user: User) {
  const users = JSON.parse((await AsyncStorage.getItem(USERS_KEY)) || "[]");
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function findUser(email: string, password: string): Promise<User | undefined> {
  const users: User[] = JSON.parse((await AsyncStorage.getItem(USERS_KEY)) || "[]");
  return users.find((u) => u.email === email && u.password === password);
}

export async function setCurrentUser(user: User) {  
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export async function getCurrentUser(): Promise<User | null> {
  const data = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function logout() {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}
