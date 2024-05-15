"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase.config";
import { v4 } from "uuid";
import axios from "axios";

export function MyTable() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fetchingAttendance, setFetchingAttendance] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleUpload = (e: any) => {
    setImageUpload(e.target.files[0]);
    console.log(e.target.files[0]);
    const imageRef = ref(storage, `images/${e.target.files[0].name + v4()}`);

    uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setImageUrl(url);
        alert("Image uploaded successfully!");
      });
    });
  };

  const handleSubmit = async () => {
    try {
      setFetchingAttendance(true); // Set state to indicate fetching is in progress
      setButtonDisabled(true); // Disable the button while fetching
      const response = await axios.post(
        "http://localhost:5000/image/attendance",
        {
          url: imageUrl,
          classroomId: "6640fbd74ca657ece9b9d5ea",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingAttendance(false); // Reset state after receiving response or error
      setButtonDisabled(false); // Enable the button again
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-6xl space-y-8">
        <div>
          <Link className="flex items-center justify-center" href="#">
            <CalendarIcon className="h-8 w-8" />
            <span className="ml-2 text-2xl font-bold">Attendance System</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Student Attendance
          </h2>
        </div>
        <div className="grid grid-cols-1">
          <div className="flex justify-center">
            <input
              type="file"
              id="upload-image"
              className="hidden"
              onChange={(e) => handleUpload(e)}
            />
            <label htmlFor="upload-image" className="cursor-pointer">
              <div className="flex items-center">
                <UploadIcon className="h-5 w-5 mr-2" />
                Upload Image
              </div>
            </label>
            {imageUrl !== "" && (
              <div className="flex flex-col">
                <img
                  src={imageUrl}
                  className="h-64 w-64 p-2"
                  alt="Uploaded Image"
                />
                <Button onClick={handleSubmit} disabled={buttonDisabled}>
                  {fetchingAttendance ? "Fetching Attendance..." : "Submit"}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Present</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell>Absent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>Present</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>Sarah Lee</TableCell>
                <TableCell>sarah@example.com</TableCell>
                <TableCell>Present</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5</TableCell>
                <TableCell>Michael Brown</TableCell>
                <TableCell>michael@example.com</TableCell>
                <TableCell>Absent</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center">
          <Button variant="outline">
            <DownloadIcon className="h-5 w-5 mr-2" />
            Download Excel
          </Button>
        </div>
      </div>
    </div>
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

function DownloadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function UploadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
