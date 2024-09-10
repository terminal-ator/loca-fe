import { Button, Spinner, Text, YStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/stores/auth";
import { useQuery } from "react-query";
import { getPostByAccount } from "@/api";
import { FlatList } from "react-native";
import PostItem from "@/components/PostItem";

export default function TabTwoScreen() {
  const { authUser, clearAuth, authAccount } = useAuthStore();
  const accountID = "cd54916f-9aae-4081-998f-f266b2caaf83";
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery([accountID], () => getPostByAccount(accountID));
  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error!</Text>;

  return (
    <SafeAreaView>
      <YStack padding={"$4"}>
        <YStack minHeight={"$16"}>
          <Text fontWeight={"bold"}>Fake Name</Text>
          <Text>Fake Username</Text>
          <Button width={"$12"} theme={"red"} onPress={clearAuth}>
            Logout
          </Button>
        </YStack>
        <YStack>
          <Text>Posts</Text>
        </YStack>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem item={item} />}
        />
      </YStack>
    </SafeAreaView>
  );
}
