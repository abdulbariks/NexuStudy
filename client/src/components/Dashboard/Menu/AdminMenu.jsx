import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={<BsGraphUp />} label="Statistics" address="/dashboard" />
      <MenuItem
        icon={<FaUserCog />}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem
        icon={<FaUserCog />}
        label="Manage Sessions"
        address="manage-sessions"
      />
      <MenuItem
        icon={<FaUserCog />}
        label="Manage Materials "
        address="manage-materials"
      />
      <MenuItem
        icon={<FaUserCog />}
        label="Create Blog"
        address="create-blog"
      />
    </>
  );
};

export default AdminMenu;
