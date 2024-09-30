import { signIn, signUp } from "@/api";
import useAuthStore from "@/stores/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useMutation } from "react-query";
import { Button, Input, Spinner, Text, YStack } from "tamagui";

export default function AuthNewF() {
  const [otp, setOTP] = useState("");
  const { currentUser, signUpData, setAuthUser, setAuthToken, setAuthAccount } =
    useAuthStore();
  const router = useRouter();

  const mutateSignIn = useMutation({
    mutationFn: ({
      phone,
      code,
      name,
      username,
    }: {
      phone: string;
      code: string;
      name: string;
      username: string;
    }) => signUp(phone, code, name, username),
    onSuccess: (data) => {
      if (data.error) {
        return;
      }

      if (!data.user || !data.sessionID || !data.account) return;
      setAuthUser(data.user);
      setAuthToken(data.sessionID);
      setAuthAccount(data.account);
      router.replace("/");
    },
  });

  const handleSubmit = () => {
    const { name, username } = signUpData;
    if (currentUser)
      mutateSignIn.mutate({
        phone: currentUser?.phone,
        code: otp,
        name,
        username,
      });
  };

  return (
    <YStack padding="$4" gap="$2">
      <Text>We have sent you an OTP</Text>
      <Input onChangeText={setOTP} placeholder="Enter the OTP here" />
      <Button disabled={mutateSignIn.isLoading} onPress={handleSubmit}>
        {mutateSignIn.isLoading ? <Spinner /> : null}
        Continue
      </Button>
    </YStack>
  );
}
