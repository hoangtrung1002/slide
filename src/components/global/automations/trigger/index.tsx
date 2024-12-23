"use client";
import React from "react";
import { useQueryAutomation } from "@/hooks/use-queries";
type Props = { id: string };

const Trigger = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  return <div></div>;
};
export default Trigger;
