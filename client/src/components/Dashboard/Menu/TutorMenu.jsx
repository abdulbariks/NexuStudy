import React from "react";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";

const TutorMenu = () => {
  return (
    <>
      <MenuItem
        icon={<BsFillHouseAddFill />}
        label="Create Study Session"
        address="create-session"
      />
      <MenuItem
        icon={<MdHomeWork />}
        label="View All Study Sessions"
        address="all-session"
      />
      <MenuItem
        icon={<MdOutlineManageHistory />}
        label="Upload Materials"
        address="upload-materials"
      />
      <MenuItem
        icon={<MdOutlineManageHistory />}
        label="View All Materials"
        address="all-materials"
      />
    </>
  );
};

export default TutorMenu;
