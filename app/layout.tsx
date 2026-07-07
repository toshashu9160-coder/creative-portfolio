import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Ashutosh — Creative Designer & Visual Artist",
  description:
    "Portfolio of Ashutosh — a creative designer specializing in graphic design, UI/UX, motion design, and video editing. Crafting bold brand identities and visual experiences.",
  openGraph: {
    title: "Ashutosh — Creative Designer & Visual Artist",
    description:
      "Portfolio of Ashutosh — a creative designer specializing in graphic design, UI/UX, motion design, and video editing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
