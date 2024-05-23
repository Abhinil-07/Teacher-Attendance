"use client";
import React, { useState } from "react";

type AttendanceStatus = "present" | "absent";

interface StudentAttendance {
  studentId: string;
  name: string;
  status: AttendanceStatus;
}

interface AttendanceRecord {
  date: string;
  attendance: StudentAttendance[];
}

const AttendanceComponent: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([
    {
      date: "2023-05-01",
      attendance: [
        { studentId: "S001", name: "John Doe", status: "present" },
        { studentId: "S002", name: "Jane Smith", status: "absent" },
        { studentId: "S003", name: "Emily Johnson", status: "present" },
      ],
    },
    {
      date: "2023-05-02",
      attendance: [
        { studentId: "S001", name: "John Doe", status: "absent" },
        { studentId: "S002", name: "Jane Smith", status: "present" },
        { studentId: "S003", name: "Emily Johnson", status: "absent" },
      ],
    },
  ]);

  const formatDataForExcel = (records: AttendanceRecord[]): string[][] => {
    const headers = [
      "Name",
      "Student ID",
      ...records.map((record) => record.date),
    ];
    const students: {
      [key: string]: {
        name: string;
        id: string;
        attendance: { [key: string]: string };
      };
    } = {};

    records.forEach((record) => {
      record.attendance.forEach((student) => {
        if (!students[student.studentId]) {
          students[student.studentId] = {
            name: student.name,
            id: student.studentId,
            attendance: {},
          };
        }
        students[student.studentId].attendance[record.date] = student.status;
      });
    });

    const rows = Object.values(students).map((student) => [
      student.name,
      student.id,
      ...records.map((record) => student.attendance[record.date] || ""),
    ]);

    return [headers, ...rows];
  };

  const downloadExcel = (): void => {
    const data = formatDataForExcel(attendanceRecords);
    let csvContent = "";

    data.forEach((row) => {
      const rowContent = row.map((item) => `"${item}"`).join(",");
      csvContent += rowContent + "\r\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Attendance.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <button onClick={downloadExcel}>Download Excel</button>
    </div>
  );
};

export default AttendanceComponent;
