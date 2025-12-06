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
import { addUser } from "../../src/features/auth/lib/storage";
import styles from "../../src/shared/styles/register.styles";

const schema = z
  .object({
    name: z.string().min(2, "Имя слишком короткое"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Минимум 6 символов"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароли не совпадают",
    path: ["confirm"],
  });

type Form = z.infer<typeof schema>;

export default function Register() {
  const { control, handleSubmit } = useForm<Form>({ // создаёт объект формы.
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: Form) => {
    await addUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    Alert.alert("Успех", `Пользователь ${data.email} зарегистрирован!`);
    router.replace("/(auth)/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Регистрация</Text>

        <Controller
          control={control} 
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputGroup}>
              <TextInput
                placeholder="Имя"
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

        <Controller
          control={control}
          name="confirm"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Повторите пароль"
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

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        </Pressable>
        
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.link}>
            Уже есть аккаунт?{" "}
            <Text style={styles.linkAction}>Войти</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

