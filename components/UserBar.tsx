import { PostType } from "@/api/types";
import { XStack, H6, Image } from "tamagui";

const UserBar = ({ item }: { item: PostType }) => {
  return (
    <XStack alignItems={"center"} gap={"$2"}>
      <Image
        borderRadius={10}
        source={{
          uri: `https://api.dicebear.com/9.x/micah/png?seed=${item.username}`,
          height: 39,
          width: 30,
        }}
      />
      <H6 fontWeight={"bold"}>{item.username}</H6>
    </XStack>
  );
};

export default UserBar;
