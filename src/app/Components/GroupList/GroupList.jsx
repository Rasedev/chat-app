import React, { useState } from 'react'
import friend from '../../../assets/friend2.png'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const GroupList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const[show,setShow] = useState(false)
  const[groupname,setgroupname] = useState('')
  const[grouptagname,setgrouptagname] = useState('')
  const [grouplist, setgrouplist] = useState([]);

  const handleCreateGroupModal = () =>{
    setShow(!show)
  }

  const handleCreateGroup = () =>{
    console.log('ok')
    set(push(ref(db, 'group/')),{
      adminid: data.uid,
      adminname: data.displayName,
      groupname: groupname,
      grouptagname: grouptagname
    })
  }
  
  
  useEffect(() => {
    const groupRef = ref(db, 'group/');
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(item.val().adminid != data.uid){
         arr.push(item.val())
        }
      });
      setgrouplist(arr);
    });
  }, []);

  console.log(grouplist, "1ert5g4i68464");

  return (
    <div className="mt-[20px] ml-[43px]">
      <div className="shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll ">  
      <div className="flex justify-between pl-[20px] pb-[17px] pt-[8px] mt-[13px]">
            <h1 className="text-[20px] font-popi font-semibold text-[#000]">Group List</h1>
            {
              show ? 
              <button onClick={handleCreateGroupModal} className='bg-red-500 p-3 text-white rounded-lg'>Go Back</button>
              :
              <button onClick={handleCreateGroupModal} className='bg-primary p-3 text-white rounded-lg'>Create Group</button>
            }
            
         </div>
        <div className="mx-[20px]"> 
        {
          show ?
           <div>
            <input onChange={(e)=>setgroupname(e.target.value)} className="w-[369px] border border-[#b8bacf] outline-none p-3 rounded-lg" type="text" placeholder='GroupName'/>
            <input onChange={(e)=>setgrouptagname(e.target.value)} className="w-[369px] border border-[#b8bacf] outline-none p-3 rounded-lg mt-5" type="text" placeholder='Group TagName' />
            <button onClick={handleCreateGroup} className='bg-primary text-white p-3 w-full rounded-lg mt-5'>Create Group</button>
           </div>
           
           :
           <>
           {
            grouplist.map((item)=>(
              <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">                     
              <img src={item.img} loading="lazy" alt=''  className="w-[70px] h-[70px] "/>            
               <div className="ml-[20px]">
                <p>{item.adminname}</p>
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">{item.groupname}</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">{item.grouptagname}</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg ml-[20px]" type="button">Join</button>             
          </div>  
            ))
           }
           
           </>
          

    
        }                   
        </div>


{/*       
       <GroupItem
        title='Group List'
        icon={<PiDotsThreeVerticalBold/>}
        img={friend}
        subtit="Friends Reunion"
        desc="Hi Guys, Wassup!"
      />
      <GroupItem
        img={friend0}
        subtit="Friends Forever"
        desc="Good to see you."
      />
      <GroupItem
        img={friend1}
        subtit="Crazy Cousins"
        desc="What plans today?"
      />
                   */}


      </div>
    </div>
  )
}

export default GroupList