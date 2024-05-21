import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { CardContent, Card } from "@/components/ui/card";
import { useState } from "react";
import AddClassroomModal from "./AddClassroomModal";
import { useRecoilState } from "recoil";
import classroomsAtom from "@/src/atoms/classrooms";

export function MyDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleAddClassroom = (classroom: { code: string; name: string }) => {};
  const classrooms = useRecoilState(classroomsAtom);
  console.log("mera classroom", classrooms);
  return (
    <>
      {/* <header className="flex h-16 w-full items-center justify-between px-6 border-b">
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
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Attendance
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Reports
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
      </header> */}
      <main className="flex flex-col gap-8 p-6 md:p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Classrooms</h1>
          <Button onClick={openModal}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Classroom
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classrooms[0].map((classroom) => (
            <Card key={classroom.code}>
              <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                <ClapperboardIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <div className="text-lg font-semibold">{classroom.name}</div>

                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          navigator.clipboard.writeText(classroom.code)
                        }
                      >
                        <CopyIcon className="h-4 w-4" />
                        <span className="sr-only">Copy Classroom Code</span>
                      </Button>
                    </Tooltip>
                    <Link href={`/dashboard/${classroom.code}`}>
                      <Button size="sm" variant="ghost">
                        <EyeIcon className="h-4 w-4" />
                        <span className="sr-only">View Classroom Details</span>
                      </Button>
                    </Link>
                    <Button size="sm" variant="ghost">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete Classroom</span>
                    </Button>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      {isModalOpen && <AddClassroomModal onClose={closeModal} />}
    </>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClapperboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LogOutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
