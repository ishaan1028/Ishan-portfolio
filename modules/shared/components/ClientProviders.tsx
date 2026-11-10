"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      // Dark is the portfolio's intended look, so first-time visitors get it
      // regardless of their OS setting. The toggle still offers Light and
      // System, and a visitor's choice is remembered.
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
