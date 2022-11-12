import { Dropdown } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { HiCog, HiOutlineCog6Tooth } from 'react-icons/hi2'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = ({children}) => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-start gap-5 md:flex-row '>
      <DashboardSidebar/>
      <div className='block px-4 pt-4 md:hidden'>
        <Dropdown label={<div className='flex flex-row items-center gap-1'><HiOutlineCog6Tooth size={18}/>Settings</div>}>
          <Link href="/dashboard/profile">
          <Dropdown.Item>

            Profile
          </Dropdown.Item>
          </Link>
          
          <Link href="/dashboard/organisation">
          <Dropdown.Item>

            Organisation
          </Dropdown.Item>
          </Link>
        </Dropdown>
      </div>
      {children}
    </div>
  )
}

export default DashboardLayout