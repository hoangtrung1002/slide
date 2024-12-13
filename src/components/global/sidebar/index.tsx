"use client";

import { usePaths } from "@/hooks/use-nav";
import { LogoSmall } from "@/svgs/logo-small";
import Items from "@/components/global/sidebar/items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "@/components/global/clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import SubscriptionPlan from "../subscription-plan";
import Upgrade from "@/components/global/sidebar/upgrade";

type Props = {
  slug: string;
};
const Sidebar = ({ slug }: Props) => {
  const { page, pathname } = usePaths();
  return (
    <div className="w-[250px] border-[1px] radial fixed left-0 lg:inline-block border-[#545454] bg-gradient-to-b from-[#768BDD] via-[#171717] to-[#768BDD] hidden bottom-0 top-0 m-3 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-3xl">
        <div className="flex gap-2 items-center justify-center p-5">
          <LogoSmall />
        </div>
        <div className="flex flex-col py-3">
          <Items slug={slug} page={page} />
        </div>
        <div className="px-16">
          <Separator orientation="horizontal" className="bg-[#5C5C5F]" />
        </div>
        <div className="p-3 flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <ClerkAuthState />
            <p className="text-[#9B9CA0]">Profile</p>
          </div>{" "}
          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className="text-[#9B9CA0]">Help</p>
          </div>
        </div>
        <SubscriptionPlan type="FREE">
          <div className="flex flex-col flex-1 justify-end">
            <Upgrade />
          </div>
        </SubscriptionPlan>
      </div>
    </div>
  );
};

export default Sidebar;
