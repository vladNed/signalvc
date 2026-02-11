import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { AuthProvider } from "../src/shared/providers/AuthProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
