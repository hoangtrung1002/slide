"use client";
import { usePaths } from "@/hooks/use-nav";
import { PAGE_BREAD_CRUMBS } from "@/constant/pages";
import Sheet from "@/components/global/sheet";
import { Menu } from "lucide-react";
import { LogoSmall } from "@/svgs/logo-small";
import Items from "@/components/global/sidebar/items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "@/components/global/clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import SubscriptionPlan from "@/components/global/subscription-plan";
import Upgrade from "@/components/global/sidebar/upgrade";
import CreateAutomation from "../create-automations";
import Search from "@/components/global/search";
import Notification from "@/components/global/notification";
import MainBreadCrumb from "@/components/global/main-bread-crumb";

type Props = { slug: string };
const InfoBar = ({ slug }: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;
  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet trigger={<Menu />} side="left" className="lg:hidden">
              <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-3xl">
                <div className="flex gap-2 items-center justify-center p-5">
                  <LogoSmall />
                </div>
                <div className="flex flex-col py-3">
                  <Items slug={slug} page={page} />
                </div>
                <div className="px-16">
                  <Separator
                    orientation="horizontal"
                    className="bg-[#5C5C5F]"
                  />
                </div>
                <div className="p-3 flex flex-col gap-y-5">
                  <div className="flex gap-x-2">
                    <ClerkAuthState />
                    <p className="text-[#9B9CA0]">Profile</p>
                  </div>
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
            </Sheet>
          </span>
          <Search />
          <CreateAutomation />
          <Notification />
        </div>
        <MainBreadCrumb page={page === slug ? "Home" : page} slug={slug} />
      </div>
    )
  );
};
export default InfoBar;
