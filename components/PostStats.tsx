import React, { useCallback, memo } from "react";
import { getPostStats, makeEffect } from "@/api";
import { Link } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Spinner, Text, View, XStack, YStack } from "tamagui";
import { ChevronDown, ChevronUp, MessageSquare } from "@tamagui/lucide-icons";
import useAuthStore from "@/stores/auth";

// const LoadingComponent = () => {
//   return (
//     <XStack marginTop={"$2"} alignItems="center" gap={"$2"} borderRadius={"$4"}>
//       <XStack alignItems={"center"} gap={"$2"}>
//         <Button size={"$2"} disabled={true} icon={<ChevronUp />} />
//         <Text justifyContent="center">
//           <View width={"$2"}></View>
//         </Text>
//         <Button size={"$2"} disabled={true} icon={<ChevronDown />} />
//       </XStack>
//       <XStack>
//         <Button size={"$2"} iconAfter={<MessageSquare />}></Button>
//       </XStack>
//       {/* <XStack>
//         <Button>Share</Button>
//       </XStack> */}
//     </XStack>
//   );
// };

const PostStats = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery(
    ["postStats", postId],
    () => getPostStats(postId),
    { staleTime: 60000 } // Add staleTime to reduce unnecessary refetches
  );

  const { authAccount } = useAuthStore();

  const mutateLikes = useMutation({
    mutationFn: ({ ev }: { ev: string }) =>
      makeEffect({ accountId: authAccount?.id!!, postId, up: ev }),
    onSuccess: () => {
      queryClient.invalidateQueries(["postStats", postId]);
    },
  });

  const handleLike = useCallback(
    () => mutateLikes.mutate({ ev: "p" }),
    [mutateLikes, postId]
  );
  const handleDislike = useCallback(
    () => mutateLikes.mutate({ ev: "n" }),
    [mutateLikes, postId]
  );

  // if (isLoading) return <LoadingComponent />;
  if (isError) return <Text>Error!</Text>;

  // return <Text>Loading...</Text>;

  return (
    <XStack marginTop={"$2"} alignItems="center" gap={"$2"} borderRadius={"$4"}>
      <XStack alignItems={"center"} gap={"$2"}>
        <Button
          circular
          size={"$2"}
          onPress={() => {
            handleLike();
          }}
        >
          +
        </Button>

        <View width={"$2"}>
          {mutateLikes.isLoading ? <Spinner /> : <Text> {data?.score} </Text>}
        </View>
        <Button
          circular
          size={"$2"}
          onPress={() => {
            handleDislike();
          }}
        >
          -
        </Button>
      </XStack>
      <XStack>
        <Link push href={`/post/${postId}`} asChild>
          <Button size={"$2"}>{data?.comments}Comments</Button>
        </Link>
      </XStack>
    </XStack>
  );
};

export default PostStats;
