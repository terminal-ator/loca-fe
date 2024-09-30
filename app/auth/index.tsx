import { getAccountByPhone, requestOTP } from "@/api";
import useAuthStore from "@/stores/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "react-query";
import { Button, Input, Spinner, Text, YStack } from "tamagui";
import { z } from "zod";

const AuthIndex = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const { setPhone: setAuthPhone, setUser } = useAuthStore();

  const mutateRequestOTP = useMutation({
    mutationFn: (phone: string) => requestOTP(phone),
  });

  const mutatePhone = useMutation({
    mutationFn: (phone: string) => getAccountByPhone(phone),
    onSuccess: (data) => {
      setAuthPhone("+91" + phone);
      if (data.error) {
        // user doesn't exist
        setUser({ phone: "+91" + phone, id: "", name: "" });
        router.push("auth/new");
      } else if (data.user) {
        setUser(data.user);
        // send otp for verification
        mutateRequestOTP.mutate("+91" + phone);
        router.push("auth/old");
      }
    },
  });

  const onContinue = () => {
    // verify if phone is valid use zod
    if (phone.length !== 10) {
      setErr("Invalid phone number");
      return;
    }
    mutatePhone.mutate("+91" + phone);
  };

  return (
    <SafeAreaView>
      <YStack padding="$4" gap="$2">
        <Text>Get started </Text>
        <Text>Enter your mobile number</Text>
        <Input
          onChangeText={(e) => {
            setPhone(e);
          }}
          placeholder="XXXXXXXXX"
        />
        {err && <Text color="red">{err}</Text>}
        <Button
          theme={"blue"}
          disabled={mutatePhone.isLoading}
          onPress={onContinue}
        >
          {mutatePhone.isLoading ? <Spinner /> : ""}
          Continue
        </Button>
      </YStack>
    </SafeAreaView>
  );
};

export default AuthIndex;
