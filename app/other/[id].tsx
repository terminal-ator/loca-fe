import { Button, Spinner, Text, YStack, XStack, ScrollView } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/stores/auth";
import { useQueries, useQuery } from "react-query";
import { getAccountById, getPostByAccount } from "@/api";
import { FlatList } from "react-native";
import PostItem from "@/components/PostItem";
import UserBar from "@/components/UserBar";
import { useLocalSearchParams } from "expo-router";
import { Account, PostType } from "@/api/types";

export default function TabTwoScreen() {
  const { id } = useLocalSearchParams();
  const results = useQueries([
    {
      queryKey: ["posts", id],
      queryFn: () => getPostByAccount(typeof id === "string" ? id : ""),
    },
    {
      queryKey: ["account", id],
      queryFn: () => getAccountById(typeof id === "string" ? id : ""),
    },
  ]);

  if (results[0].isLoading || results[1].isLoading)
    return <Spinner size="large" />;
  if (results[0].isError || results[1].isError)
    return <Text color="$red">Error loading posts. Please try again.</Text>;

  const account = results[1].data as Account;
  const posts = results[0].data as PostType[];
  console.log(account);

  return (
    <YStack>
      <YStack>
        <YStack padding="$4" space="$4">
          <YStack space="$3">
            <UserBar item={account} />
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
              <Text color="$gray10">No Posts yet</Text>
            )}
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
