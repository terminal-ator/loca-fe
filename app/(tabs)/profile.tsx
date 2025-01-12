import { Button, Spinner, Text, YStack, XStack, ScrollView } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/stores/auth";
import { useQuery } from "react-query";
import { getPostByAccount } from "@/api";
import { FlatList } from "react-native";
import PostItem from "@/components/PostItem";
import UserBar from "@/components/UserBar";

export default function TabTwoScreen() {
  const { authUser, clearAuth, authAccount } = useAuthStore();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery([authAccount?.id], () => getPostByAccount(authAccount?.id));

  if (isLoading) return <Spinner size="large" />;
  if (isError)
    return <Text color="$red">Error loading posts. Please try again.</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <YStack>
        <YStack padding="$4" gap="$4">
          <YStack space="$3">
            <UserBar item={authAccount} />
            <Button width="100%" theme="red" onPress={clearAuth}>
              Logout
            </Button>
          </YStack>

          <YStack p="$2">
            <Text fontSize="$6" fontWeight="bold">
              Posts
            </Text>
            {posts && posts.length > 0 ? (
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostItem item={item} />}
                ItemSeparatorComponent={() => <YStack height={10} />}
              />
            ) : (
              <Text color="$gray10">You haven't posted anything yet.</Text>
            )}
          </YStack>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
