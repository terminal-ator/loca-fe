import usePincodeStore from "@/stores/pincode";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Input, Text, View, YStack } from "tamagui";

const LocationPage = () => {
  const [pincode, setPincode] = useState("");
  const { setSelectedPincode } = usePincodeStore();
  const [err, setErr] = useState("");
  const router = useRouter();

  const handleSave = () => {
    setErr("");

    // validate pincode size
    if (pincode.length !== 6) {
      setErr("Pincode must be 6 digits");
      return;
    }
    setSelectedPincode(pincode);
    router.back();
  };

  return (
    <YStack padding={"$2"}>
      <Input
        keyboardType="number-pad"
        value={pincode}
        onChangeText={setPincode}
        placeholder="Enter your pincode"
      />
      <Text color={"red"}>{err}</Text>
      <Button onPress={handleSave}>Save</Button>
    </YStack>
  );
};

export default LocationPage;
