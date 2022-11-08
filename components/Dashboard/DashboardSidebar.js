import { Sidebar } from "flowbite-react";
import React from "react";
import {HiOutlineUser,HiOutlineBuildingOffice2} from 'react-icons/hi2';

const DashboardSidebar = () => {
  return (
    <div className="w-fit">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiOutlineUser}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiOutlineBuildingOffice2}
            >
              Organisation
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;
