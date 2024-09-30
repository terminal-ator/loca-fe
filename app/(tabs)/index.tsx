import { getPostsByPincode } from "@/api";
import PostItem from "@/components/PostItem";
import useConfStore from "@/stores/conf";
import usePincodeStore from "@/stores/pincode";
import { Link } from "expo-router";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useQuery } from "react-query";
import {
  Image,
  Button,
  Card,
  H2,
  H4,
  H5,
  H6,
  ListItem,
  Theme,
  XStack,
  YStack,
  Paragraph,
  Spinner,
} from "tamagui";

export default function HomeScreen() {
  const { seletedPincode } = usePincodeStore();
  const { hasAdded } = useConfStore();

  const { data, isError, isLoading, refetch } = useQuery(
    ["posts", seletedPincode, hasAdded],
    () => getPostsByPincode(seletedPincode)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error!</Text>;

  return (
    <YStack backgroundColor={"white"} flex={1} padding={"$2"}>
      <YStack>
        <H4 marginBottom={"$2"} color={"black"}>
          {`Happening in `}
          <Link
            style={{ color: "red", textDecorationLine: "underline" }}
            href={`/location`}
          >
            {seletedPincode}
          </Link>
        </H4>
        {data && data?.length < 1 && (
          <>
            <Text>There are no posts in this pincode</Text>
            <Button
              alignSelf="center"
              width={"$8"}
              onPress={() => {
                refetch();
              }}
            >
              Retry
            </Button>
          </>
        )}
        <FlatList
          style={{ marginBottom: 30 }}
          refreshing={isLoading}
          onRefresh={refetch}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem item={item} />}
        />
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
