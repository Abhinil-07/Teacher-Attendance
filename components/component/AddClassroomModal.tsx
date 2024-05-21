import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSetRecoilState } from "recoil";
import classroomsAtom from "@/src/atoms/classrooms";
import axios from "axios";
import { classroomURL } from "@/src/utils/constants";

interface AddClassroomModalProps {
  onClose: () => void;
}

interface Classroom {
  code: string;
  name: string;
}

function AddClassroomModal({ onClose }: AddClassroomModalProps) {
  const [classroom, setClassroom] = useState("");
  const setClassroomList = useSetRecoilState<Classroom[]>(classroomsAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassroom(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: classroom,
        teacherID: "6643ccccfac1d09dbe0c0579", // Corrected key name
      };
      console.log("Sending payload:", payload);

      const response = await axios.post(
        `${classroomURL}/create-classroom`,
        payload
      );

      console.log("Response data:", response.data);

      const newClassroom = {
        code: response.data.classroom.id, // Use `id` as `code`
        name: response.data.classroom.name,
      };

      setClassroomList((prevClassrooms) => [...prevClassrooms, newClassroom]);
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
    }
    onClose();
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
            value={classroom}
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
        </div>
      </div>
    </div>
  );
}

export default AddClassroomModal;
