import { createPost, createReply } from "@/api";
import useAuthStore from "@/stores/auth";
import useConfStore from "@/stores/conf";
import usePincodeStore from "@/stores/pincode";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "react-query";
import {
  Button,
  H1,
  Input,
  Paragraph,
  TextArea,
  Theme,
  YStack,
  XStack,
  Separator,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import UserBar from "@/components/UserBar";

const NewPost = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { authAccount, authToken } = useAuthStore();
  const { invalidateHasAdded } = useConfStore();
  const { seletedPincode: pincode } = usePincodeStore();
  const [content, setContent] = useState("");
  const qc = useQueryClient();

  const addPost = useMutation({
    mutationFn: (c: string) =>
      createPost({
        content: c,
        pincode,
        accountId: authAccount?.id!!,
        sess: authToken!!,
      }),
    onSuccess(data, variables, context) {
      invalidateHasAdded();
      router.replace("/");
      router.push(`/post/${data.id}`);
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
        <YStack padding="$4" gap="$4" flex={1}>
          <XStack justifyContent="space-between" alignItems="center">
            <Button
              theme="gray"
              icon={<Ionicons name="close" size={24} />}
              onPress={() => router.back()}
            />
            <Button
              disabled={!content || content.length < 1}
              theme="blue"
              onPress={onPress}
            >
              Post
            </Button>
          </XStack>

          <Separator />

          <XStack alignItems="center" gap="$2">
            <Ionicons name="location" size={20} color="gray" />
            <Paragraph>
              Posting in{" "}
              <Link
                style={{
                  color: "blue",
                  fontWeight: "bold",
                }}
                href="/location"
              >
                {pincode}
              </Link>
            </Paragraph>
          </XStack>

          <UserBar item={authAccount} />

          <TextArea
            value={content}
            onChangeText={(text) => setContent(text)}
            rows={6}
            verticalAlign="top"
            placeholder="What's on your mind?"
            autoFocus
          />
        </YStack>
      </Theme>
    </SafeAreaView>
  );
};

export default NewPost;
