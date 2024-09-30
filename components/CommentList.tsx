import { getReplies } from "@/api";
import { useQuery } from "react-query";
import { H4, Paragraph, ScrollView, Spinner, YStack } from "tamagui";
import PostItem from "./PostItem";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { FlatList } from "react-native";

const CommentList = ({ postId }: { postId: string }) => {
  if (!postId) return <Paragraph>No id</Paragraph>;

  const { data, isError, isLoading, refetch } = useQuery(
    ["comments", postId],
    () => getReplies(postId)
  );
  useRefreshOnFocus(refetch);
  if (isLoading)
    return (
      <YStack>
        <H4>Replies</H4>
        <Spinner />
      </YStack>
    );
  if (isError) return <Paragraph>Error!</Paragraph>;
  return (
    <YStack>
      <YStack>
        <H4>Replies</H4>
        {data?.length === 0 ? <Paragraph>No replies</Paragraph> : null}
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => <PostItem item={item} key={item.id} />}
        />
      </YStack>
    </YStack>
  );
};

export default CommentList;
