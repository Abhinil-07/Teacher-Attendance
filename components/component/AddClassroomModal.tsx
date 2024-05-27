import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import classroomsAtom from "@/src/atoms/classrooms";
import axios from "axios";
import { classroomURL } from "@/src/utils/constants";
import userAtom from "@/src/atoms/userAtom";
import ShortUniqueId from "short-unique-id";
import toast from "react-hot-toast";

interface AddClassroomModalProps {
  onClose: () => void;
}

interface Classroom {
  code: string;
  name: string;
}

function AddClassroomModal({ onClose }: AddClassroomModalProps) {
  const [classroom, setClassroom] = useState<Classroom>({ name: "", code: "" });
  const setClassroomList = useSetRecoilState<Classroom[]>(classroomsAtom);
  const teacherDetails = useRecoilValue(userAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = new ShortUniqueId().randomUUID(6);
    setClassroom({
      name: event.target.value,
      code: id,
    });
  };

  const handleSubmit = async () => {
    try {
      const teacherID = teacherDetails._id;
      // const id = new ShortUniqueId().randomUUID(6);
      const payload = {
        name: classroom.name,
        teacherID,
        id: classroom.code,
      };
      console.log("Sending payload:", payload);

      const response = await axios.post(
        `${classroomURL}/create-classroom`,
        payload
      );

      console.log("Response data:", response.data);

      const newClassroom = {
        code: response.data.classroom.code, // Use `id` as `code`
        name: response.data.classroom.name,
      };

      setClassroomList((prevClassrooms) => [...prevClassrooms, newClassroom]);
      toast.success("Classroom added successfully");
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request error:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("General error:", error.message);
      }
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96 h-60">
        <h2 className="text-xl font-bold mb-4">Add Classroom</h2>
        <div className="mb-4">
          <label
            htmlFor="className"
            className="block text-sm font-medium text-gray-700"
          >
            Classroom Name
          </label>
          <input
            type="text"
            id="className"
            name="name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={classroom.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="mr-2">
            Submit
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Close
          </Button>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default AddClassroomModal;
