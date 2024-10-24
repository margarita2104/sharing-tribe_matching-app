import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen flex-col bg-white/[2%]">
      {children}
    </div>
  );
}
