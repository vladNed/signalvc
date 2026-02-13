"use client";

import { BriefcaseBusiness, House, User } from "lucide-react";
import { SwipeStack } from "../components/SwipeStack";
import { MOCK_STARTUPS } from "../consts/mockStartups";

export function DiscoveryPage() {
  return (
    <div className="h-screen text-white bg-linear-to-b from-[#000A2E] to-[#010411]">
      <div className="py-10 h-full ">
        <div className="max-w-120 mx-auto  h-full grid grid-rows-12">
          {/* Card */}
          <div className="row-span-11">
            <SwipeStack startups={MOCK_STARTUPS} />
          </div>

          {/* Footer */}
          <div className="row-span-1 flex items-center justify-center gap-6">
            <div className="border rounded-full flex gap-12 justify-between px-8 py-4 border-[#06123D] bg-[#06123D66]">
              <div className="flex flex-col items-center text-xs gap-1 text-white cursor-pointer">
                <House size={20} />
                Feed
              </div>
              <div className="flex flex-col items-center text-xs gap-1 text-muted-foreground cursor-not-allowed blur-xs">
                <BriefcaseBusiness size={20} />
                Portofolio
              </div>
              <div className="flex flex-col items-center text-xs gap-1 text-muted-foreground cursor-not-allowed blur-xs">
                <User size={20} />
                Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
