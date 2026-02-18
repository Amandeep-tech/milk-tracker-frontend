import React from 'react'

interface ISideBarProps {
  position?: "right" | "left"
}

const SideBar = (props: ISideBarProps) => { 
  const {
    position = "right"
  } = props;
  return (
    <div className='h-full w-[50rem] absolute right-[-40rem] top-0'>
      <div className='flex items-end'>Close</div>
      SideBar</div>
  )
}

export default SideBar