"use client";
import React from "react";
import { useQueryAutomation } from "@/hooks/use-queries";
import ActiveTrigger from "@/components/global/automations/trigger/active";
import { Separator } from "@/components/ui/separator";
import ThenAction from "@/components/global/automations/then/then-action";

const Trigger = ({ id }: { id: string }) => {
  const { data } = useQueryAutomation(id);
  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col gap-y-6 items-center">
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data.data.keywords}
        />
        <>
          <div className="relative w-6/12 mt-4">
            <p className="absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
              or
            </p>
            <Separator
              orientation="horizontal"
              className="border-muted border-[1px]"
            />
          </div>
          <ActiveTrigger
            type={data.data.trigger[1].type}
            keywords={data.data.keywords}
          />
        </>
        <ThenAction />
      </div>
    );
  }
};
export default Trigger;
