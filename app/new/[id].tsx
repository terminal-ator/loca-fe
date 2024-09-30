import { createPost, createReply } from "@/api";
import PostItem, { SimplePostItem } from "@/components/PostItem";
import UserBar from "@/components/UserBar";
import usePostByID from "@/hooks/usePostByID";
import useAuthStore from "@/stores/auth";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Button,
  H1,
  Input,
  Paragraph,
  TextArea,
  Theme,
  View,
  YStack,
} from "tamagui";

const NewPost = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [content, setContent] = useState("");
  const { authAccount, authToken } = useAuthStore();
  const qc = useQueryClient();
  const { data: replyPost, isLoading } = usePostByID(
    typeof id === "string" ? id : undefined
  );

  const addPost = useMutation({
    mutationFn: (c: string) =>
      createPost({
        content: c,
        pincode: "203207",
        accountId: "cd54916f-9aae-4081-998f-f266b2caaf83",
        sess: authToken!!,
      }),
    onSuccess(data, variables, context) {
      //
      router.back();
    },
  });

  const addReply = useMutation({
    mutationFn: (c: string) =>
      createReply({
        content: c,
        postId: id as string,
        accountId: authAccount?.id!!,
        sess: authToken!!,
      }),
    onSuccess(data, variables, context) {
      router.back();
    },
  });

  const onPress = () => {
    if (!content || content.length < 1) return;
    if (id === "new") {
      addPost.mutate(content);
      qc.invalidateQueries({ queryKey: ["posts"] });
    } else addReply.mutate(content);
  };

  return (
    <Theme name="light">
      <Stack.Screen
        options={{
          headerTitle: "Reply",
          headerRight: () => (
            <Button
              disabled={!content || content.length < 1}
              theme={"blue"}
              alignSelf="flex-end"
              width={"max-content"}
              onPress={onPress}
            >
              Post
            </Button>
          ),
        }}
      />
      <YStack padding={"$2"} gap={"$2"}>
        {id === "new" ? (
          <Paragraph>Posting in 203207 as Tushar </Paragraph>
        ) : (
          <Paragraph>Replying to </Paragraph>
        )}
        {replyPost ? <SimplePostItem item={replyPost} /> : null}
        <View
          borderWidth={1}
          borderColor="$gray10"
          padding={"$2"}
          borderRadius={"$4"}
        >
          <UserBar item={authAccount} />
          <TextArea
            marginTop={"$2"}
            value={content}
            onChangeText={(text) => setContent(text)}
            rows={6}
            verticalAlign="top"
            placeholder="reply"
          />
        </View>
      </YStack>
    </Theme>
  );
};

export default NewPost;
