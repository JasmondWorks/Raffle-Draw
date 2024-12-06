import CreateEventDialog from "@/components/CreateEventDialog";
import Events from "@/components/Events";
import SpinnerFull from "@/components/SpinnerFull";
import React, { Suspense } from "react";

export default function UserHomePage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <div className="min-w-screen min-h-screen pt-14">
        <section className="">
          <div className="container space-y-10">
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">Events</h2>
              <CreateEventDialog />
            </div>
            <Suspense fallback={<SpinnerFull />} key={searchParams.page}>
              <Events searchParams={searchParams} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
