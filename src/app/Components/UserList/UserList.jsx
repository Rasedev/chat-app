import React, { useEffect, useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import Raghav from "../../../assets/raghav2.png";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data, "dattttatatta");
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendrequestList, setFriendrequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [searchdata, setsearchdata] = useState([])


  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key != data.uid) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);

  // console.log(userList, 'userList')

  const handleFriendRequest = (item) => {
    //console.log("giooooo", item);

    set(push(ref(db, "friendRequest/")), {
      sendername: data.displayName,
      senderid: data.uid,
      receivername: item.username,
      receiverid: item.userid,
    });
  };

  useEffect(() => {
    const friendrequestRef = ref(db, 'friendRequest/');
    onValue(friendrequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
       // console.log(item.val(), '355667ddddddddd1dddd');
        arr.push(item.val(), );
        arr.push(item.val().receiverid + item.val().senderid);
        //console.log(item.val().receiverid)
        //console.log(item.val().senderid)
      });
       setFriendrequestList(arr);
    });
  }, []);
 // console.log(friendrequestList);

 
  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
       let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val(), 'friendddddddddd')
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setFriendList(arr);
    });
  }, []);
  //console.log(friendList, "1ert5g4i68464");


  useEffect(() => {
    const blockRef = ref(db, 'block/');
    onValue(blockRef, (snapshot) => {
        let arr = [];
      snapshot.forEach((item) => {
        //console.log(item.val(), 'BBBBBBBBBBBBBBBB')
        arr.push(item.val().blockid + item.val().blockbyid);
      });
       setBlockList(arr);
    });
  }, []);

//console.log(blockList, 'bbbbbbbbbbbbb')
  

  const handleSearch = (e) =>{
    // console.log(e.target.value)
    let arr = []
    if(e.target.value.length == 0){
      setsearchdata([])
      //console.log('hjdfhyy')
    }else{
      userList.map((item)=>{
        if((item.username.toLowerCase().includes(e.target.value.toLowerCase()))){
          arr.push(item)
          setsearchdata(arr)
          //console.log(item, 'ashhtkhhyy')
        }
        
      })
    }
   

  }



  return (
    <div className="mt-[10px] ml-[43px]">
      <div className="shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll ">
       
        <div className="flex justify-between pl-[20px] pb-[17px] pt-[8px] mt-[13px] sticky">
          <h1 className="text-[20px] font-popi font-semibold text-[#000]">
            User List
          </h1>
          
          <div className="text-[25px] mr-[10px] text-primary"><PiDotsThreeVerticalBold /></div>
        </div>
        <div className="">
          <input onChange={handleSearch} type="text" placeholder="Search"  className="border border-primary p-3 m-3 outline-none"/>
        </div>
        
        <div className="mx-[20px]">

          {
            searchdata.length > 0 ?
            searchdata.map((item)=>(                            
                <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">
                  <img src={item.img} loading="lazy" alt="" className="w-[80px] h-[80px] "/>
                  <div className="">
                    <h3 className="text-[18px] font-popi font-semibold text-[#000]">{item.username}</h3>
                    <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">{item.email}</p>
                  </div>
                  {
                    blockList.includes(data.uid + item.userid) ||
                    blockList.includes(item.userid + data.uid)
                    ?
                    <button
                    className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                    type="button">Block</button>
                    :
                    friendList.includes(data.uid + item.userid) ||
                    friendList.includes(item.userid + data.uid )
                    ?
                    <button
                    className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                    type="button">Friend</button>
                    :
                    friendrequestList.includes(data.uid + item.userid) ||
                    friendrequestList.includes(item.userid + data.uid )
                    ?
                    <button
                    className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                    type="button">Pending</button>
                    :
                    <button
                    onClick={() => handleFriendRequest(item)}
                    className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                    type="button"><AiOutlinePlus /></button>
                  }
                  
                </div>
              
            ))
            :
            userList.map((item) => (
              <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">
                <img src={item.img} loading="lazy" alt="" className="w-[80px] h-[80px] "/>
                <div className="">
                  <h3 className="text-[18px] font-popi font-semibold text-[#000]">{item.username}</h3>
                  <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">{item.email}</p>
                </div>
                {
                  blockList.includes(data.uid + item.userid) ||
                  blockList.includes(item.userid + data.uid)
                  ?
                  <button
                  className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                  type="button">Block</button>
                  :
                  friendList.includes(data.uid + item.userid) ||
                  friendList.includes(item.userid + data.uid )
                  ?
                  <button
                  className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                  type="button">Friend</button>
                  :
                  friendrequestList.includes(data.uid + item.userid) ||
                  friendrequestList.includes(item.userid + data.uid )
                  ?
                  <button
                  className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                  type="button">Pending</button>
                  :
                  <button
                  onClick={() => handleFriendRequest(item)}
                  className="text-[20px] font-popi font-semibold py-1 px-[10px] text-[#fff] rounded-lg bg-primary"
                  type="button"><AiOutlinePlus /></button>
                }
                
              </div>
            ))
          
        }

        </div>       
      </div>
    </div>
  );
};

export default UserList;
