import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Providers } from "@/providers";
import userAtom from "@/src/atoms/userAtom";
import { CalendarIcon, LogOutIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRecoilValue } from "recoil";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <header className="flex h-16 w-full items-center justify-between px-6 border-b">
            <nav className="flex items-center gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="#"
              >
                <CalendarIcon className="h-6 w-6" />
                <span className="sr-only">Attendance System</span>
              </Link>
              <Link className="font-bold" href="#">
                Classrooms
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">John Doe</div>
              </div>
              <Button className="rounded-full" size="icon" variant="ghost">
                <LogOutIcon className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </header>
          {children}
        </body>
      </Providers>
    </html>
  );
}
