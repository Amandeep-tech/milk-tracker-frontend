import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});


export const metadata: Metadata = {
  title: "Milk Tracker",
  description: "Track my daily milk entries easily",
  // icons: {
  //   icon: "/icon.png",
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
