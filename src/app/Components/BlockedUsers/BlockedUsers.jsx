import React from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import Raghav from '../../../assets/raghav2.png'
import {getDatabase,onValue,push,ref,remove,set } from "firebase/database";
import { useSelector } from "react-redux";
import  { useEffect, useState } from "react";



const BlockedUsers = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [blocklist, setBlocklist] = useState([])

  useEffect(() => {
    const blockRef = ref(db, 'block/');
    onValue(blockRef, (snapshot) => {
        let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val(), 'Blocked')
        if(item.val().blockbyid == data.uid){
         arr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          })
        }else{
          arr.push({
            id: item.key,
            blockby: item.val().blockby,
            blockbyid: item.val().blockbyid,
          })
        }
      });
       setBlocklist(arr);
    });
  }, []);
   console.log(blocklist, "1ert5g4i68464");

   const handleunBlock = (item) =>{
      console.log('unblock', item)
      
        set(push(ref(db, 'friend/')),{
          sendername: item.block,
          senderid: item.blockid,
          receivername: data.displayName,
          receiverid: data.uid
        })
        .then(()=>{
         remove(ref(db, 'block/' + item.id))
        })
   }
 
   




  return (
    <div className="mt-[40px] ml-[43px]">
      <div className="shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll ">       
      <div className="flex justify-between pl-[20px] pb-[17px] pt-[8px] mt-[13px] ">
            <h1 className="text-[20px] font-popi font-semibold text-[#000]">Blocked Users</h1>
            <div className='text-[25px] mr-[10px] text-primary'><PiDotsThreeVerticalBold/></div>
         </div>
        <div className="mx-[20px]">
          {
            blocklist.map((item)=>(

           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={item.img} alt='' className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">{item.block}</h3>
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">{item.blockby}</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Today, 8:56pm</p>
              </div>
              {
                !item.blockbyid &&
              <button onClick={()=>handleunBlock(item)} className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
           text-[#fff] rounded-lg" type="button">Unblock</button>               
              }
             </div>                
            ))

          }
        </div>
        {/* <div className="mx-[20px]">
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Swathi} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Swathi</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Today, 2:31pm</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg" type="button">Unblock</button>               
          </div>                
        </div>
        <div className="mx-[20px]">
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Kiran} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Kiran</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Yesterday, 6:22pm</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg" type="button">Unblock</button>               
          </div>                
        </div>
        <div className="mx-[20px]">
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Tejes} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Tejeshwini C</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Today, 12:22pm</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg" type="button">Unblock</button>               
          </div>                
        </div>
        <div className="mx-[20px]">
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Mar} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Marvin </h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Today, 8:56pm</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg" type="button">Unblock</button>               
          </div>                
        </div> */}

{/*        
       
       <GroupItem
        title='Blocked Users'
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
      <GroupItem
        img={Mar}
        subtit="Marvin"
        desc="Today, 8:56pm"
      />
 */}


      </div>
    </div>
  )
}

export default BlockedUsers