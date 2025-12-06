import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { findUser, setCurrentUser } from "../../src/features/auth/lib/storage";
import styles from "../../src/shared/styles/login.styles";

const schema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type Form = z.infer<typeof schema>;

export default function Login() {
  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: Form) => {
    const user = await findUser(data.email, data.password);
    if (user) {
      await setCurrentUser({ email: user.email, name: user.name });
      Alert.alert("Добро пожаловать", `${user.name}`);
      router.replace("/(tabs)");
    } else {
      Alert.alert("Ошибка", "Неверный email или пароль");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Вход</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Пароль"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </View>
          )}
        />

        {/* Кнопка Войти */}
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Войти</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.link}>
            Нет аккаунта?{" "}
            <Text style={styles.linkAction}>
              Зарегистрироваться
            </Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
