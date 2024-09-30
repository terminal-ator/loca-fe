import { checkUsername, requestOTP } from "@/api";
import useAuthStore from "@/stores/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "react-query";
import { YStack, Text, Input, Button } from "tamagui";
import { useDebounce } from "@uidotdev/usehooks";

const AuthNew = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");
  const { currentUser, setUserSignUpData } = useAuthStore();
  const [canContinue, setCanContinue] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [err, setErr] = useState("");
  const debouncedUsername = useDebounce(username, 500);

  const mutateRequestOTP = useMutation({
    mutationFn: (phone: string) => requestOTP(phone),
  });

  const continueHandler = () => {
    if (name.length < 3 || username.length < 3) {
      setErr("Name and username must be atleast 3 characters");
      return;
    }
    if (!canContinue) {
      setErr("Username already taken, select another one");
      return;
    }
    mutateRequestOTP.mutate(`+91${currentUser?.phone}`);
    setUserSignUpData({ name, username, referral });

    router.push("/auth/newf");
  };

  useEffect(() => {
    const checkUsernameUi = async () => {
      setIsSearching(true);
      if (debouncedUsername.length < 3) {
        setIsSearching(false);
        return;
      }
      const res = await checkUsername(debouncedUsername);

      setCanContinue(res);
      setIsSearching(false);
    };
    checkUsernameUi();
  }, [debouncedUsername]);

  return (
    <SafeAreaView>
      <YStack padding="$4" gap="$2">
        <Text>Hi, you are new here</Text>
        <Input onChangeText={setName} placeholder="Enter your name" />
        <Input onChangeText={setUsername} placeholder="Choose your username" />
        <Input onChangeText={setReferral} placeholder="Have a referral?" />
        {canContinue && username.length > 3 ? (
          <Text>{`${username} is available`}</Text>
        ) : null}
        {!canContinue && username.length > 3 ? (
          <Text>{`${username} is not available`}</Text>
        ) : null}
        {isSearching && <Text>Searching...</Text>}
        <Button onPress={continueHandler}>Continue</Button>
      </YStack>
    </SafeAreaView>
  );
};

export default AuthNew;
