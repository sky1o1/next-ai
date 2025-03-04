import { useQuery } from "@tanstack/react-query";
import { customerDetail } from "../../api/chat/customerDetail";

export const useCustomerDetail = (id: number) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => customerDetail(id),
    enabled: !!id,
  });
};
