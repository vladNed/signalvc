/// <reference types="nativewind/types" />
import { Button } from "@signalvc/ui/src/components/Button/index";
import { Input } from "@signalvc/ui/src/components/Input/index";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useLogin } from "./hooks/useLogin";

export default function AuthScreen() {
  const router = useRouter();
  const { signInWithPassword, signInWithOAuth, loading, error } = useLogin();

  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = async () => {
    if (step === "email" && email) {
      setStep("password");
      return;
    }

    if (step === "password" && password) {
      const success = await signInWithPassword(email, password);
      if (success) {
        router.replace("/");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-4">
        <View className="w-full max-w-sm gap-y-6">
          <View className="gap-y-2 mb-4">
            <Text className="text-3xl font-bold text-foreground text-center">Welcome back</Text>
            <Text className="text-muted-foreground text-center">
              Enter your email to sign in to your account
            </Text>
          </View>

          <View className="gap-y-4">
            <View className="gap-y-2">
              <Input
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={step !== "password" && !loading}
                className="bg-input text-foreground border-border"
                placeholderTextColor="#a1a1aa"
              />
              {step === "password" && (
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!loading}
                  className="bg-input text-foreground border-border"
                  placeholderTextColor="#a1a1aa"
                />
              )}
            </View>
            {error && <Text className="text-sm text-red-500">{error}</Text>}
            <Button
              onPress={handleContinue}
              disabled={loading}
              label={loading ? "Loading..." : step === "email" ? "Continue with Email" : "Sign In"}
            />
          </View>

          <View className="relative py-4">
            <View className="absolute inset-0 flex-row items-center">
              <View className="flex-1 border-t border-border" />
            </View>
            <View className="relative flex-row justify-center">
              <Text className="bg-background px-2 text-muted-foreground text-xs uppercase">
                Or continue with
              </Text>
            </View>
          </View>

          <View className="gap-y-2">
            <Button
              variant="google"
              label="Google"
              onPress={() => signInWithOAuth("google")}
              disabled={loading}
            />
            <Button
              variant="apple"
              label="Apple"
              onPress={() => signInWithOAuth("apple")}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
