import { getPost } from "@/api";
import CommentList from "@/components/CommentList";
import PostStats from "@/components/PostStats";
import UserBar from "@/components/UserBar";
import usePostByID from "@/hooks/usePostByID";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "react-query";
import { H1, Paragraph, Theme, YStack, H3, XStack, Input } from "tamagui";

const PostScreen = () => {
  const { id } = useLocalSearchParams();
  if (typeof id !== "string") return <H1>Not a string</H1>;
  const { data, isLoading, isError } = usePostByID(id);

  if (isLoading) return <H3>Loading</H3>;
  if (!data) return <H3>No Post Found</H3>;
  if (isError) return <H3>Error while fetching the post</H3>;
  if (!id) return <H1>No id</H1>;

  return (
    <Theme name="light">
      <YStack backgroundColor={"white"} height={"100%"}>
        <YStack gap="$4" padding="$4">
          <UserBar item={data!!} />
          <Paragraph fontSize={"$6"}>{data?.content}</Paragraph>
          <PostStats postId={id} />
        </YStack>
        <YStack>
          <Link href={`/new/${data?.id}`} asChild>
            <XStack alignSelf="center" margin={"auto"} width={"90%"}>
              <Input width={"100%"} placeholder="Add a reply" disabled={true} />
            </XStack>
          </Link>
        </YStack>
        <YStack padding={"$4"} flex={1}>
          <CommentList postId={id} />
        </YStack>
      </YStack>
    </Theme>
  );
};

export default PostScreen;
