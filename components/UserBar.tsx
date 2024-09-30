import { Account, PostType, UserType } from "@/api/types";
import { Link } from "expo-router";
import { XStack, H6, Image } from "tamagui";

const UserBar = ({ item }: { item: PostType | Account }) => {
  const id = item?.acc_id ?? item?.id;

  return (
    <XStack>
      <Link href={`/other/${id}`}>
        <XStack alignItems={"center"} gap={"$2"}>
          <Image
            borderRadius={10}
            source={{
              uri: `https://api.dicebear.com/9.x/micah/png?seed=${item?.username}`,
              height: 39,
              width: 30,
            }}
          />
          <H6 fontWeight={"bold"}>{item?.username}</H6>
        </XStack>
      </Link>
    </XStack>
  );
};

export default UserBar;
