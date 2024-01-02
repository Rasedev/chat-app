import React, { useEffect, useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import {getDatabase,onValue,push,ref,remove,set,} from "firebase/database";
import { useSelector } from "react-redux";



const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendrequest, setFriendrequest] = useState([]);
  
  useEffect(() => {
    const friendrequestRef = ref(db, 'friendRequest/');
    onValue(friendrequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == data.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendrequest(arr);
    });
  }, []);
  console.log(friendrequest, "1ert5g4i68464");
  
  const handleAccept = (item) => {
    console.log("hhhhhhhhhhhhhhhhhhh", item);
    set(push(ref(db, "friend/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendRequest/"));
    });
  };

  return (
    <div className="mt-[40px] ml-[43px]">
      <div className="shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll ">
        <div className="flex justify-between pl-[20px] pb-[17px] pt-[8px] mt-[13px]">
          <h1 className="text-[20px] font-popi font-semibold text-[#000]">
            Friend Request
          </h1>
          <div className="text-[25px] mr-[10px] text-primary">
            <PiDotsThreeVerticalBold />
          </div>
        </div>
        <div className="mx-[20px]">

          {
          friendrequest.length == 0 ?
          <p>No Data</p>
          : 
          friendrequest.map((item) => (
            <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">
              <img
                src={item.img}
                loading="lazy"
                alt=""
                className="w-[80px] h-[80px] "
              />
              <div className="">
                <h3 className="text-[18px] font-popi font-semibold text-[#000]">
                  {item.sendername}
                </h3>
                <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">
                  Dinner
                </p>
              </div>
              <button
                onClick={() => handleAccept(item)}
                className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
               text-[#fff] rounded-lg"
                type="button"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
        {/* 
        <div className="mx-[20px]">               
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Swathi} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Swathi</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Sure!</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg" type="button">Accept</button>             
          </div>                        
        </div>

        <div className="mx-[20px]">               
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Kiran} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Kiran</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">Hi.....</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg" type="button">Accept</button>             
          </div>                        
        </div>
        <div className="mx-[20px]">               
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={Tejes} loading="lazy" alt=''  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">Tejeshwini C</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">I will call him today.</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[10px] bg-primary
          text-[#fff] rounded-lg" type="button">Accept</button>             
          </div>                        
        </div>
         */}

        {/*        

       <GroupItem
        title='Friend  Request'
        icon={<PiDotsThreeVerticalBold/>}
        img={Raghav}
        subtit="Raghav"
        desc="Dinner?"       
      />
      <GroupItem
        img={Swathi}
        subtit="Swathi"
        desc="Sure!"
      />
      <GroupItem
        img={Kiran}
        subtit="Kiran"
        desc="Hi....."
      />
      <GroupItem
        img={Tejes}
        subtit="Tejeshwini C"
        desc="I will call him today."
      />

       */}
      </div>
    </div>
  );
};

export default FriendRequest;
