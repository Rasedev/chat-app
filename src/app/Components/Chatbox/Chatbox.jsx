import React, { useEffect, useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import profile from "../../../assets/swathi 3.png";
import { RiTriangleFill } from "react-icons/ri";
import Login from "../../../assets/Log.png";
import ModalImage from "react-modal-image";
import { SlEmotsmile } from "react-icons/sl";
import { VscDeviceCamera } from "react-icons/vsc";
import { FaTelegramPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment/moment";
import {
  getDownloadURL,
  getStorage,
  ref as sref,
  uploadBytes,
} from "firebase/storage";

const Chatbox = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const storage = getStorage();
  const activeData = useSelector((state) => state.activeChat.active);
  console.log(activeData);
  const [msg, setMsg] = useState("");
  const [singleMsg, setSingleMsg] = useState([]);

  const handleMsg = () => {
    console.log("ok");
    if (activeData.status == "single") {
      set(push(ref(db, "singleMsg/")), {
        msg: msg,
        whosenderid: data.uid,
        whosendername: data.displayName,
        whoreceiverid: activeData.id,
        whoreceivername: activeData.name,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()} :  ${new Date().getHours()},  ${new Date().getMinutes()} `,
      });
    } else {
      console.log("Ami group");
    }

    // dispatch(userLoginInfo(user));
    // localStorage.setItem("userLoginInfo", JSON.stringify(user));
  };

  useEffect(() => {
    const singleMsgRef = ref(db, "singleMsg/");
    onValue(singleMsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
       //
        console.log(item.val(), 'singleMsgmmmmmmmmmm')

        if (
          (item.val().whosenderid == data.uid &&
            item.val().whoreceiverid == activeData.id) ||
          (item.val().whoreceiverid == data.uid &&
            item.val().whosenderid == activeData.id)
        ) {
          arr.push(item.val());
        }
      });
      setSingleMsg(arr);
    });
  }, []);

  console.log(singleMsg, "singleMsg234567");

  const handleImg = (e) => {
    console.log(e.target.files[0]);
    const storageRef = sref(storage, "some-child");
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singleMsg/")), {
          img: downloadURL,
          whosenderid: data.uid,
          whosendername: data.displayName,
          whoreceiverid: activeData.id,
          whoreceivername: activeData.name,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()} :  ${new Date().getHours()},  ${new Date().getMinutes()} `,
        });
      });
    });
  };

  return (
    <div className="mt-[20px] ml-[43px]">
      <div className="shadow shadow-box rounded-[20px] pl-10 pr-10 ">
        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5 sticky z-[9999] top-0 bg-white">
          <div className="flex items-center">
            <img src={profile} alt="" />
            <div className="ml-[30px]">
              <h3 className="text-[18px] font-popi font-semibold text-[#000]">
                {activeData.name}
                {/* Swati */}
              </h3>
              <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">
                Online
              </p>
            </div>
          </div>

          <div className="text-[25px] mr-[10px] text-primary">
            <PiDotsThreeVerticalBold />
          </div>
        </div>

        <div className="mt-10 border-b-2 border-gray-300 h-[665px] px-3 overflow-y-scroll">
          {
          singleMsg.map((item) => (
            item.whosenderid == data.uid ? 
            item.img ? 
              <div className="text-right">
                <div className="bg-primary p-3 inline-block rounded-lg mb-10">
                  <ModalImage
                    small={item.img}
                    large={item.img}
                    className="w-60 "
                  />
                </div>
              </div>
             : 
              <div className=" text-right">
                <div className="relative inline-block px-[20px] py-[15px] text-justify bg-primary rounded-lg w-[300px] mr-[10px]">
                  <p className="text-[18px] font-popi font-medium text-white">
                    {item.msg}
                  </p>
                  <RiTriangleFill className="absolute bottom-[-2px] right-[-8px] text-primary" />
                </div>
                <div className="">
                  <p className="">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              </div>
            
           :
           item.img ? 
            <div className="">
              <div className="bg-[#F1F1F1] p-3 inline-block rounded-lg z-[9999]">
                <ModalImage
                  small={item.img}
                  large={item.img}
                  className="w-60 z-[9999]"
                />
              </div>
            </div>
           : 
            <div className=" w-[300px]">
              <div className="relative inline-block px-[20px] py-[15px] text-justify bg-[#F1F1F1] rounded-lg ">
                <p className="text-[18px] font-popi font-semibold text-[#000]">
                  {item.msg}
                </p>
                <RiTriangleFill className="absolute bottom-[-2px] left-[-8px] text-[#F1F1F1]" />
              </div>
              <div className="">
                <p className="">
                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                </p>
              </div>
            </div>
          
          )
            
         ) }

          {/* RECEIVER MSG START */}
          {/* <div className=" w-[300px]">
            <div className="relative inline-block px-[20px] py-[15px] text-justify bg-[#F1F1F1] rounded-lg ">
              <p className="text-[18px] font-popi font-semibold text-[#000]">
                Lorem suscipit! Lorem suscipit Lorem suscipit 
              </p>
              <RiTriangleFill className="absolute bottom-[-2px] left-[-8px] text-[#F1F1F1]" />
            </div>
          </div> */}
          {/* RECEIVER MSG END */}

          {/* SENDER MSG START */}
          {/* <div className=" text-right">
            <div className="relative inline-block px-[20px] py-[15px] text-justify bg-primary rounded-lg w-[300px] mr-[10px]">
              <p className="text-[18px] font-popi font-semibold text-white">
                Lorem ipsum dolor sit elit.
              </p>
              <RiTriangleFill className="absolute bottom-[-2px] right-[-8px] text-primary" />
            </div>
          </div> */}
          {/* SENDER MSG END */}

          {/* RECEIVER MSG START */}
          {/* <div className="">
            <div className="bg-[#F1F1F1] p-3 inline-block rounded-lg z-[9999]">
              <ModalImage
                small={Login}
                large={Login}
                className="w-60 z-[9999]"
              />
            </div>
          </div> */}
          {/* RECEIVER MSG END */}

          {/* SENDER MSG START */}
          {/* <div className="text-right">
            <div className="bg-primary p-3 inline-block rounded-lg mb-10">
              <ModalImage small={Login} large={Login} className="w-60 " />
            </div>
          </div> */}
          {/* SENDER MSG END */}
        </div>

        <div className="flex items-center relative">
          <div className="flex items-center relative w-[595px]">
            <div className="pb-3 mt-7 mb-7">
              <input
                type="text"
                className="w-[540px] h-[50px] rounded-l-lg pb-7 pt-7 bg-[#F1F1F1] outline-none pl-5"
                placeholder=""
                onChange={(e) => setMsg(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center absolute top-[28px] right-0 bg-[#F1F1F1] w-[60px] h-[56px] rounded-r-lg">
              <SlEmotsmile className="text-[18px] mr-2 " />
              <label>
                <input onChange={handleImg} type="file" className="hidden" />
                <VscDeviceCamera className="text-[25px]" />
              </label>
            </div>
          </div>
          <div
            onClick={handleMsg}
            className=" bg-primary w-[56px] h-[56px] ml-10  absolute top-[28px] right-0 rounded-lg cursor-pointer"
          >
            <FaTelegramPlane className="text-white absolute bottom-[35%] left-[30%] text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
