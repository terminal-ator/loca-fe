import { getPostStats, makeEffect } from "@/api";
import { Link } from "expo-router";
import { useMutation, useQuery } from "react-query";
import { Button, Spinner, Text, View, XStack } from "tamagui";
import { ChevronDown, ChevronUp, MessageSquare } from "@tamagui/lucide-icons";

const LoadingComponent = () => {
  return (
    <XStack marginTop={"$2"} alignItems="center" gap={"$2"} borderRadius={"$4"}>
      <XStack alignItems={"center"} gap={"$2"}>
        <Button size={"$2"} disabled={true} icon={<ChevronUp />} />
        <Text justifyContent="center">
          <View width={"$2"}></View>
        </Text>
        <Button size={"$2"} disabled={true} icon={<ChevronDown />} />
      </XStack>
      <XStack>
        <Button size={"$2"} iconAfter={<MessageSquare />}></Button>
      </XStack>
      {/* <XStack>
        <Button>Share</Button>
      </XStack> */}
    </XStack>
  );
};

const PostStats = ({ postId }: { postId: string }) => {
  // console.log(postId);
  const { data, isError, isLoading, refetch } = useQuery(
    ["postStats", postId],
    () => getPostStats(postId)
  );

  const mutateLikes = useMutation({
    mutationFn: ({ ev }: { ev: string }) => makeEffect({ postId, up: ev }),
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) return <LoadingComponent />;
  if (isError) return <Text>Error!</Text>;

  return (
    <XStack marginTop={"$2"} alignItems="center" gap={"$2"} borderRadius={"$4"}>
      <XStack alignItems={"center"} gap={"$2"}>
        <Button
          size={"$2"}
          disabled={mutateLikes.isLoading}
          icon={<ChevronUp />}
          onPress={() => mutateLikes.mutate({ ev: "p" })}
        />
        <Text justifyContent="center">
          <View width={"$2"}>
            {mutateLikes.isLoading ? <Spinner /> : <Text> {data?.score} </Text>}
          </View>
        </Text>
        <Button
          size={"$2"}
          disabled={mutateLikes.isLoading}
          icon={<ChevronDown />}
          onPress={() => mutateLikes.mutate({ ev: "n" })}
        />
      </XStack>
      <XStack>
        <Link push href={`/post/${postId}`} asChild>
          <Button size={"$2"} iconAfter={<MessageSquare />}>
            {data?.comments}
          </Button>
        </Link>
      </XStack>
      {/* <XStack>
        <Button>Share</Button>
      </XStack> */}
    </XStack>
  );
};

export default PostStats;
