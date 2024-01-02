import React from 'react'
import GroupList from '../../Components/GroupList/GroupList'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Friends from '../../Components/Friends/Friends'
import Chatbox from '../../Components/Chatbox/Chatbox'

const Message = () => {
  return (
    <div className="flex">
    <div className="w-[186px] py-4">
        <Sidebar active='msg'/>
        </div>
  
    <div className="w-[420px]">
      <GroupList/>
      <Friends/>
     
   
    </div>
    
    <div className="w-[820px]">
      <Chatbox/>
      </div>
    
    {/* <div className="w-[344px]">Friends</div>
    <div className="w-[344px]">User List</div> */}
  </div>
  )
}

export default Message