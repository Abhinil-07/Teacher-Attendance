"use client";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { CardContent, Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import AddClassroomModal from "./AddClassroomModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import classroomsAtom from "@/src/atoms/classrooms";
import { classroomURL, attendanceURL } from "@/src/utils/constants";
import axios from "axios";
import Loading from "../loading";
import { DownloadIcon } from "lucide-react";
import toast from "react-hot-toast";
interface AttendanceRecord {
  studentId: string;
  name: string;
  present: number;
}

interface AttendanceData {
  date: string;
  attendance: AttendanceRecord[];
}
export function MyDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleAddClassroom = (classroom: { code: string; name: string }) => {};
  const classrooms = useRecoilState(classroomsAtom);
  const setClassrooms = useSetRecoilState(classroomsAtom);

  console.log("mera classroom", classrooms);

  const handleCopyToClipboard = (text: string, name: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() =>
        toast.success(`Classroom code for ${name} ${text} copied to clipboard`)
      );
  };

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(`${classroomURL}/all`);
        console.log(response.data.classrooms);
        setClassrooms(response.data.classrooms);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClassrooms();
  }, [setClassrooms]);

  const handleDownloadCSV = async (classroomId: string) => {
    try {
      const response = await axios.get(
        `${attendanceURL}/cumulative/${classroomId}`
      );
      const data: AttendanceData[] = response.data.attendance;

      generateCSV(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const generateCSV = (data: AttendanceData[]) => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    csvContent += "Name,Student ID";
    data.forEach((attendance) => {
      csvContent += `,${new Date(attendance.date).toLocaleDateString()}`;
    });
    csvContent += ",Total\n"; // Add Total column header

    // Create a map to store attendance records by student
    const studentAttendanceMap: {
      [key: string]: {
        name: string;
        studentId: string;
        days: number[];
        total: number;
      };
    } = {};

    // Populate the map
    data.forEach((attendance, dateIndex) => {
      attendance.attendance.forEach((record: any) => {
        if (!studentAttendanceMap[record.studentId]) {
          studentAttendanceMap[record.studentId] = {
            name: record.name,
            studentId: record.studentId,
            days: [],
            total: 0,
          };
        }
        studentAttendanceMap[record.studentId].days[dateIndex] = record.present;
        studentAttendanceMap[record.studentId].total += record.present;
      });
    });

    // Add attendance records
    for (const studentId in studentAttendanceMap) {
      const record = studentAttendanceMap[studentId];
      csvContent += `${record.name},${record.studentId}`;
      record.days.forEach((present) => {
        csvContent += `,${present === 1 ? "Present" : "Absent"}`;
      });
      csvContent += `,${record.total}\n`; // Add total present count for each student
    }

    // Create a temporary link to trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                            handleCopyToClipboard(
                              classroom.code,
                              classroom.name
                            )
                          }
                        >
                          <CopyIcon className="h-4 w-4" />
                          <span className="sr-only">Copy Classroom Code</span>
                        </Button>
                      </Tooltip>
                      <Link href={`/dashboard/${classroom.code}`}>
                        <Button size="sm" variant="ghost">
                          <EyeIcon className="h-4 w-4" />
                          <span className="sr-only">
                            View Classroom Details
                          </span>
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete Classroom</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownloadCSV(classroom.code)}
                      >
                        <DownloadIcon className="h-4 w-4" />
                        <span className="sr-only">
                          Download Attendance Sheet
                        </span>
                      </Button>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}
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
