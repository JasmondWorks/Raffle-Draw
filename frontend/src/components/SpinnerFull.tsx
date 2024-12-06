import React from "react";

export default function SpinnerFull() {
  return (
    <div
      // style={{ height: "calc(100vh - 36px)" }}
      className={`top-0 left-0 h-screen
      w-screen absolute grid place-items-center justify-center`}
    >
      <div className="loader !w-16 !h-16 !border-[3px] !border-brandSec !border-b-transparent"></div>
    </div>
  );
}
