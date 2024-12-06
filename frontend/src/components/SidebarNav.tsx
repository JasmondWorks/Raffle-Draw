"use client";

import React, { useState } from "react";

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);
  
  return (
    <div>
      <div className="overlay bg-[rgba(0 0 0 /.4) h-screen w-screen"></div>
      <div>
        <nav></nav>
      </div>
    </div>
  );
}
