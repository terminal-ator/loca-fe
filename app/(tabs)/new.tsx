import { createPost, createReply } from "@/api";
import useConfStore from "@/stores/conf";
import usePincodeStore from "@/stores/pincode";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "react-query";
import { Button, H1, Input, Paragraph, TextArea, Theme, YStack } from "tamagui";

const NewPost = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { invalidateHasAdded } = useConfStore();
  const { seletedPincode: pincode } = usePincodeStore();
  const [content, setContent] = useState("");
  const qc = useQueryClient();

  const addPost = useMutation({
    mutationFn: (c: string) =>
      createPost({
        content: c,
        pincode,
        accountId: "cd54916f-9aae-4081-998f-f266b2caaf83",
      }),
    onSuccess(data, variables, context) {
      // console.log(data);
      invalidateHasAdded();
      router.back();
    },
  });

  const onPress = () => {
    if (!content || content.length < 1) return;
    addPost.mutate(content);
    setContent("");
    qc.invalidateQueries({ queryKey: ["posts"] });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Theme name="light">
        <YStack padding={"$2"} gap={"$2"}>
          <Button
            disabled={!content || content.length < 1}
            theme={"blue"}
            alignSelf="flex-end"
            width={"max-content"}
            onPress={onPress}
          >
            Post
          </Button>

          <Paragraph>
            {`Posting in `}
            <Link
              style={{ color: "red", textDecorationLine: "underline" }}
              href={`/location`}
            >
              {pincode}
            </Link>
            {` as Tushar`}
          </Paragraph>

          <TextArea
            value={content}
            onChangeText={(text) => setContent(text)}
            rows={6}
            verticalAlign="top"
            placeholder="What's on your mind?"
          />
        </YStack>
      </Theme>
    </SafeAreaView>
  );
};

export default NewPost;
