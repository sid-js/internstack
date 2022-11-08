import React from 'react'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = ({children}) => {
  return (
    <div className='flex flex-row gap-5 '>
      <DashboardSidebar/>
      {children}
    </div>
  )
}

export default DashboardLayout