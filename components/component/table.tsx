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
import { Student } from "@/src/utils/types";

export function MyTable() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fetchingAttendance, setFetchingAttendance] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [data, setData] = useState<Student[]>([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return; // Exit early if files are null or empty
    }
    const file = files[0];
    setImageUpload(file);
    setUploading(true); // Set uploading to true when the upload starts

    const imageRef = ref(storage, `images/${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        alert("Image uploaded successfully!");
        setUploading(false); // Set uploading to false when the upload is complete
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
      setData(response.data.data);
      setImage(response.data.image);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingAttendance(false); // Reset state after receiving response or error
      setButtonDisabled(false); // Enable the button again
    }
  };
  const convertToCSV = () => {
    const header = ["S.No.", "Name", "ID", "Attendance"];
    const csvData = [header.join(",")];
    data.forEach((student, index) => {
      const rowData = [
        index + 1,
        student.name,
        student.studentId,
        student.present ? "Present" : "Absent",
      ];
      csvData.push(rowData.join(","));
    });
    return csvData.join("\n");
  };

  const downloadCSV = () => {
    const csv = convertToCSV();
    const csvFile = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(csvFile);
    link.download = "attendance.csv";
    link.click();
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
              onChange={handleUpload}
            />
            <label htmlFor="upload-image" className="cursor-pointer">
              <div className="flex items-center">
                <UploadIcon className="h-5 w-5 mr-2" />
                {uploading ? "Uploading..." : "Upload Image"}
              </div>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {imageUrl !== "" && (
            <div className="flex flex-col justify-center items-center">
              <img
                src={imageUrl}
                className="p-2 w-[400px] h-[300px]"
                alt="Uploaded Image"
              />
              <Button
                className="w-[100px]"
                onClick={handleSubmit}
                disabled={buttonDisabled}
              >
                {fetchingAttendance ? "Fetching Attendance..." : "Submit"}
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          {image && (
            <img
              src={`data:image/png;base64,${image}`}
              alt="marked image"
              className="w-auto h-auto"
            />
          )}
        </div>
        {data.length > 0 && (
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>
                      {student.present ? "Present" : "Absent"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {data.length === 0 ? (
          <div className="flex justify-center">
            <p>No data available</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button variant="outline" onClick={downloadCSV}>
              <DownloadIcon className="h-5 w-5 mr-2" />
              Download Excel
            </Button>
          </div>
        )}
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
