import React from "react";
import { useQueryUser } from "@/hooks/use-queries";

type Props = { children: React.ReactNode; type: "FREE" | "PRO" };

const SubscriptionPlan = ({ children, type }: Props) => {
  const { data } = useQueryUser();
  return data?.data?.subscription?.plan === type && children;
};
export default SubscriptionPlan;
