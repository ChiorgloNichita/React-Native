import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../src/features/auth/lib/storage";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setLoggedIn(!!user);
      setReady(true);
    });
  }, []);

  if (!ready) return null; 

  return loggedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
}
