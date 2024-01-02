import React, { useEffect } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import Raghav from '../../../assets/raghav2.png'
import { useState } from 'react';
import { getDatabase, onValue, ref} from 'firebase/database';
import { useSelector } from 'react-redux';
import { push } from 'firebase/database';




const MyGroup = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [mygroup, setmygroup] = useState([]);
  
  useEffect(() => {
    const groupRef = ref(db, 'group/');
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(item.val().adminid == data.uid){
         arr.push(item.val())
        }
      });
      setmygroup(arr);
    });
  }, []);

  console.log(mygroup, "1ert5g4i68464");

  return (
    <div className="mt-[40px] ml-[43px]">
      <div className="shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll ">       
      <div className="flex justify-between pl-[20px] pb-[17px] pt-[8px] mt-[13px]">
            <h1 className="text-[20px] font-popi font-semibold text-[#000]">My Group</h1>
            <div className='text-[25px] mr-[10px] text-primary'><PiDotsThreeVerticalBold/></div>
         </div>
        <div className="mx-[20px]">  
        {
          mygroup.map((item)=>(
            <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
            <img src={item.img} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
             <div className="">
              <p>{item.adminname}</p>
             <h3 className="text-[18px] font-popi font-semibold text-[#000]">{item.groupname}</h3>
             <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">{item.grouptagname}</p>
            </div>
            <h3 className="text-[10px] font-popi font-medium text-[#000]">Today, 8:56pm</h3>
            
        </div> 
          )) 
        }             
                                 
        </div>

        {/* <div className="mx-[20px]">               
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Swathi} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Swathi</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Sure!</p>
              </div>
              <h3 className="text-[10px] font-popi font-medium text-[#000]">Today, 8:56pm</h3>         
          </div>                        
        </div>

        <div className="mx-[20px]">               
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Kiran} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Kiran</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Hi.....</p>
              </div>
              <h3 className="text-[10px] font-popi font-medium text-[#000]">Today, 8:56pm</h3>           
          </div>                        
        </div>
        <div className="mx-[20px]">               
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Tejes} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Tejeshwini C</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">I will call him today.</p>
              </div>
              <h3 className="text-[10px] font-popi font-medium text-[#000]">Today, 8:56pm</h3>           
          </div>                        
        </div> */}
{/*        
       <GroupItem
        title='My Groups'
        icon={<PiDotsThreeVerticalBold/>}
        img={Raghav}
        subtit="Raghav"
        desc="Today, 8:56pm"
       
      />
      <GroupItem
        img={Swathi}
        subtit="Swathi"
        desc="Today, 2:31pm"
      />
      <GroupItem
        img={Kiran}
        subtit="Kiran"
        desc="Yesterday, 6:22pm"
      />
      <GroupItem
        img={Tejes}
        subtit="Tejeshwini C"
        desc="Today, 12:22pm"
      />

       */}
      </div>
    </div>
  )
}

export default MyGroup