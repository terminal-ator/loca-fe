import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "react-query";
import { TamaguiProvider, Theme, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config";
import useAuthStore from "@/stores/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const client = new QueryClient();
const tconfig = createTamagui(config);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tconfig}>
      <QueryClientProvider client={client}>
        <Theme name="light">
          <Stack>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
            <Stack.Screen
              name="new/[id]"
              options={{ title: "New Post", presentation: "modal" }}
            />
            <Stack.Screen
              name="other/[id]"
              options={{ title: "Profile", presentation: "modal" }}
            />
            <Stack.Screen
              name="location"
              options={{ title: "Change Location" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Theme>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "auth",
};
