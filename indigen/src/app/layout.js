import "./globals.css";
import ClientLayout from "@/client-layout";
import { ViewTransitions } from "next-view-transitions";

import { geistMono, bigShouldersDisplay, ppNeueMontreal, ppPangramSans } from "./fonts";

export const metadata = {
  title: "Indigen Services | AI & SaaS Development",
  description: "Indigen Services: Next-generation AI, SaaS, automation, and full-stack development for smarter, faster, future-ready businesses.",
  icons: {
    icon: "/site-logo.png",
    shortcut: "/site-logo.png",
    apple: "/site-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} ${bigShouldersDisplay.variable} ${ppNeueMontreal.variable} ${ppPangramSans.variable}`}>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
