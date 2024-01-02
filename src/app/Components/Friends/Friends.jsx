import React from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import Raghav from '../../../assets/raghav2.png'
import {getDatabase,onValue,push,ref,remove,set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import  { useEffect, useState } from "react";
import { activeChat } from '../../Redux/slices/activeChatSlice';






const Friends = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data)
  const [friend, setFriend] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
       let arr = [];
      snapshot.forEach((item) => {
       // console.log(item.val(), 'friendddddddddd')
       if(item.val().receiverid == data.uid || item.val().senderid == data.uid){
           arr.push({...item.val(), key:item.key})
       }
      });
       setFriend(arr);
    });
  }, []);
  //console.log(friend, "1ert5g4i68464");

  const handleBlock = (item) =>{
    console.log(item, 'Block')
    if(data.uid == item.senderid){
         set(push(ref(db, 'block/')),{
          block: item.receivername,
          blockid: item.receiverid,
          blockby: item.sendername,
          blockbyid: item.senderid
         }).then(()=>{
          remove(ref(db, 'friend/' + item.key))
         })
    }else{
      set(push(ref(db, 'block/')),{
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid
       }).then(()=>{
        remove(ref(db, 'friend/' + item.key))
       })
    }
  }

  const handleMsgData = (item) =>{
    //console.log('ok cool', item)
     if(data.uid == item.senderid){    
       dispatch(
        activeChat({
        status: 'single',
        id: item.receiverid,
        name: item.receivername
       })
       )
     
    }else{
      dispatch(
        activeChat({
        status: 'single',  
        id: item.senderid,
        name: item.sendername
      })
      )
    }
  }

  return (
    <div className="mt-[20px] ml-[43px]">
      <div className="shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll ">      

      <div className="flex justify-between pl-[20px] pb-[17px] pt-[8px] mt-[13px]">
            <h1 className="text-[20px] font-popi font-semibold text-[#000]">Friends</h1>
            <div className='text-[25px] mr-[10px] text-primary'><PiDotsThreeVerticalBold/></div>
         </div>
        <div className="mx-[20px]">               
          {
            friend.map((item)=>(
              <div onClick={()=>handleMsgData(item)} className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Raghav} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">
                {
                  item.receiverid == data.uid ? item.sendername : item.receivername
                  // data.displayName
                }
                </h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Dinner</p>
              </div>
              <h3 className="text-[15px] font-popi font-semibold text-[#000]">Today, 8:56pm</h3>

              <button onClick={() => handleBlock(item)}
                className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary" type="button">Block</button>
          </div>   
            ))
          }                     
        </div>
{/* 
        <div className="mx-[20px]">               
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
        </div>
         */}

{/* 
       <GroupItem
        title='Friends'
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

export default Friends