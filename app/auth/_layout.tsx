import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{ title: "Sign up" }} />
      <Stack.Screen name="old" options={{ title: "Verify account" }} />
    </Stack>
  );
}
