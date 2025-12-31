import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/provider";

export const metadata: Metadata = {
  title: "Next Cart",
  description: "Your thunder delivery partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-[200vh] bg-linear-to-b from bg-green-100 to-white">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
