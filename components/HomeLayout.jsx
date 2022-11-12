import React from "react";
import SideMenu from "./SideMenu";

export const HomeLayout = ({ children }) => {
  return (
    <div className="flex flex-row items-start w-full gap-5 px-4 py-4 mx-2 my-4 md:px-16 justify-items-stretch">
      <SideMenu />
      {children}
    </div>
  );
};
