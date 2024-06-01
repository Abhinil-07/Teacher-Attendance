"use client";
import React, { useState } from "react";
import axios from "axios";
import { attendanceURL } from "@/src/utils/constants";

interface AttendanceRecord {
  studentId: string;
  name: string;
  present: number;
}

interface AttendanceData {
  date: string;
  attendance: AttendanceRecord[];
}

const ExampleComponent: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get(`${attendanceURL}/cumulative`);
      const data: AttendanceData[] = response.data.attendance;
      console.log("masti", data);
      setAttendanceData(data);
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
      attendance.attendance.forEach((record) => {
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
    <div>
      <button onClick={handleDownloadCSV}>Download CSV</button>
    </div>
  );
};

export default ExampleComponent;
