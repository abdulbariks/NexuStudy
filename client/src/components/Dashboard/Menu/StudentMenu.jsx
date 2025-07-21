import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeTutorModal from "../../Modal/BecomeTutorModal";

const StudentMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <MenuItem
        icon={<BsFingerprint />}
        label="View Booked Session"
        address="booked-session"
      />
      <MenuItem
        icon={<BsFingerprint />}
        label="Create Note"
        address="create-note"
      />
      <MenuItem
        icon={<BsFingerprint />}
        label="Manage Personal Notes"
        address="personal-notes"
      />
      <MenuItem
        icon={<BsFingerprint />}
        label="View All Study Materials"
        address="study-materials"
      />

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Tutor</span>
      </div>

      <BecomeTutorModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default StudentMenu;
