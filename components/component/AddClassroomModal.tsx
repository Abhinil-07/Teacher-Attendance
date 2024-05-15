import React, { useState } from "react";
import { Button } from "../ui/button";

interface AddClassroomModalProps {
  onClose: () => void;
  onSubmit: (classroom: { code: string; name: string }) => void;
}

function AddClassroomModal({ onClose, onSubmit }: AddClassroomModalProps) {
  const [classroom, setClassroom] = useState({ code: "", name: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClassroom((prevClassroom) => ({
      ...prevClassroom,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(classroom);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96 h-80">
        <h2 className="text-xl font-bold mb-4">Add Classroom</h2>
        <div className="mb-4">
          <label
            htmlFor="classroomCode"
            className="block text-sm font-medium text-gray-700"
          >
            Classroom Code
          </label>
          <input
            type="text"
            id="classroomCode"
            name="code"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={classroom.code}
            onChange={handleInputChange}
          />
        </div>
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
          <Button variant={"destructive"} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddClassroomModal;
