import { PostType } from "@/api/types";
import { YStack, XStack, H6, Paragraph, Image } from "tamagui";
import PostStats from "./PostStats";
import { Link } from "expo-router";
import UserBar from "./UserBar";

const PostItem = ({ item }: { item: PostType }) => (
  <Link push href={`/post/${item.id}`} asChild>
    <YStack padding={"$2"} marginHorizontal={"$2"}>
      <YStack>
        <UserBar item={item} />
        <Paragraph paddingHorizontal={"$6"} size={"$6"}>
          {item.content}
        </Paragraph>
      </YStack>
      <PostStats postId={item.id} />
    </YStack>
  </Link>
);

export default PostItem;

export const SimplePostItem = ({ item }: { item: PostType }) => (
  <YStack padding={"$2"} marginHorizontal={"$2"}>
    <YStack>
      <UserBar item={item} />
      <Paragraph paddingHorizontal={"$6"} size={"$6"}>
        {item.content}
      </Paragraph>
    </YStack>
  </YStack>
);
