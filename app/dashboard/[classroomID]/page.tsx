import { MyTable } from "@/components/component/table";
import React from "react";

const page = ({ params }: { params: { classroomID: string } }) => {
  return (
    <div>
      {/* <h1>{params.classroomID}</h1> */}
      <MyTable classroomID={params.classroomID} />;
    </div>
  );
};

export default page;
