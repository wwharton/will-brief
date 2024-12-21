'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

export function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  );
}
