import { getReplies } from "@/api";
import { useQuery } from "react-query";
import { H4, Paragraph, Spinner, YStack } from "tamagui";
import PostItem from "./PostItem";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

const CommentList = ({ postId }: { postId: string }) => {
  if (!postId) return <Paragraph>No id</Paragraph>;
  console.log(postId);
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
      <H4>Replies</H4>
      {data?.length === 0 ? <Paragraph>No replies</Paragraph> : null}
      {data?.map((item) => (
        <PostItem item={item} key={item.id} />
      ))}
    </YStack>
  );
};

export default CommentList;
