import { useInfiniteQuery } from "@tanstack/react-query";
import { customerList } from "../../api/chat/customerList";

export const useCustomer = () => {
  return useInfiniteQuery({
    queryKey: ["customer-list"],
    queryFn: customerList,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};
