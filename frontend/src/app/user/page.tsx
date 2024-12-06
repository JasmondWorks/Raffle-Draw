"use client";

import CreateEventDialog from "@/components/CreateEventDialog";
import Events from "@/components/Events";
import SpinnerFull from "@/components/SpinnerFull";
import { useSearchParams } from "next/navigation"; // Next.js 13+ hook for searchParams
import React, { Suspense } from "react";

export default function UserHomePage() {
  const searchParams = useSearchParams(); // Use the hook to get the searchParams

  // Extract the 'page' parameter from searchParams
  const page = searchParams?.get("page") || "1"; // Default to "1" if no page is provided

  return (
    <>
      <div className="min-w-screen min-h-screen pt-14">
        <section className="">
          <div className="container space-y-10">
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">Events</h2>
              <CreateEventDialog />
            </div>
            <Suspense fallback={<SpinnerFull />} key={page}>
              <Events page={page} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
