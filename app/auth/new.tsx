import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Text, Input, Button } from "tamagui";

const AuthNew = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");
  const [err, setErr] = useState("");

  const continueHandler = () => {
    if (name.length < 3 || username.length < 3) {
      setErr("Name and username must be atleast 3 characters");
      return;
    }
    router.push("/auth/old");
  };

  return (
    <SafeAreaView>
      <YStack padding="$4" gap="$2">
        <Text>Hi, you are new here</Text>
        <Input onChangeText={setName} placeholder="Enter your name" />
        <Input onChangeText={setUsername} placeholder="Choose your username" />
        <Input onChangeText={setReferral} placeholder="Have a referral?" />
        <Text>{err}</Text>
        <Button onPress={continueHandler}>Continue</Button>
      </YStack>
    </SafeAreaView>
  );
};

export default AuthNew;
