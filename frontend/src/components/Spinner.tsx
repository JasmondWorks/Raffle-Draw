import React from "react";

export default function Spinner({ className='' }) {
  return (
    <div
      className={`loader w-16 h-16 border-[3px] border-indigo-600 !border-b-transparent ${className}`}
    ></div>
  );
}
