import { Sidebar } from 'flowbite-react'
import React from 'react'
import {HiOutlineDocumentMagnifyingGlass,HiOutlinePuzzlePiece,HiOutlineUsers} from "react-icons/hi2"

export default function SideMenu() {
  return (
    <div className="rounded-full drop-shadow-md w-fit">
    <Sidebar>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item
          href="#"
          icon={HiOutlineDocumentMagnifyingGlass}
        >
          Internships
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiOutlinePuzzlePiece}
        >
          Projects
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiOutlineUsers}
        >
          Community
        </Sidebar.Item>

      </Sidebar.ItemGroup>
    </Sidebar.Items>
    </Sidebar>
    </div>
  )
}
