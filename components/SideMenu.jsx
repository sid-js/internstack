import { Sidebar } from "flowbite-react";
import { useRouter } from "next/router";
import React from "react";
import {
  HiDocumentMagnifyingGlass,
  HiPuzzlePiece,
  HiUsers,
  HiHome,
  HiMagnifyingGlass,
  HiUser,
} from "react-icons/hi2";

export default function SideMenu() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div className="hidden text-lg font-semibold rounded-full drop-shadow-md w-fit md:block">
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              className={router.pathname == "/" && "bg-blue-100"}
            >
              <div className="flex flex-row items-center w-full gap-3">
                <HiHome
                  size={25}
                  className={
                    router.pathname == "/" ? "text-blue-500" : "text-gray-500"
                  }
                />
                <span className="text-lg font-semibold">Home</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={router.pathname == "/internships" && "bg-blue-100"}
            >
              <div className="flex flex-row items-center w-full gap-3">
                <HiDocumentMagnifyingGlass
                  size={25}
                  className={
                    router.pathname == "/internships"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }
                />
                <span className="text-lg font-semibold">Internships</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={router.pathname == "/projects" && "bg-blue-100"}
            >
              <div className="flex flex-row items-center w-full gap-3">
                <HiPuzzlePiece
                  size={25}
                  className={
                    router.pathname == "/projects"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }
                />
                <span className="text-lg font-semibold">Projects</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={router.pathname == "/community" && "bg-blue-100"}
            >
              <div className="flex flex-row items-center w-full gap-3">
                <HiUsers
                  size={25}
                  className={
                    router.pathname == "/community"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }
                />
                <span className="text-lg font-semibold">Community</span>
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
