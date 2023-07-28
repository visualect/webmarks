"use client";

import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-[1000px] mx-auto my-0 px-4">{children}</div>;
}
