import { useQuery } from "@tanstack/react-query";
import { getAllAutomations } from "@/actions/automations";

export const useQueryAutomation = () => {
  return useQuery({
    queryKey: ["user-automations"],
    queryFn: getAllAutomations,
  });
};
