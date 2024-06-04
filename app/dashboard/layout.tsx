// import Navbar from "@/components/navbar";

import { Providers } from "@/providers";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
        <Providers>
          <Navbar />
          {children}
          {/* </ThemeProvider> */}
        </Providers>
      </body>
    </html>
  );
}
