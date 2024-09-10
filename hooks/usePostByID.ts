import { getPost } from "@/api";
import { useRefreshOnFocus } from "./useRefreshOnFocus";
import { useQuery } from "react-query";

const usePostByID = (id: string | undefined) => {
  const { data, isLoading, refetch } = useQuery(["post", id], () =>
    getPost(id!!)
  );
  useRefreshOnFocus(refetch);

  return { data, isLoading };
};

export default usePostByID;