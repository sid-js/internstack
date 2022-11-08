import React from "react";
import SideMenu from "./SideMenu";

export const HomeLayout = ({ children }) => {
  return (
    <div className="flex flex-row items-start w-full gap-5 px-20 py-4 my-4 justify-items-stretch">
      <SideMenu />
      {children}
    </div>
  );
};
