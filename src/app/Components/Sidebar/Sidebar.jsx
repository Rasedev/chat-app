import React, { useState, createRef } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LiaFileExportSolid } from "react-icons/lia";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {getStorage,ref,uploadString,getDownloadURL} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../../Redux/slices/userSlice";
import { getDatabase, update, ref as dref } from "firebase/database";
//import { useDispatch } from 'react-redux'
//import { removeItem } from "../../Redux/slices/userSlice";

const Sidebar = ({active}) => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  //console.log(data.displayName);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const [profilePhoto, setProfilePhoto] = useState("");
  let [profileModal, setProfileModal] = useState(false);
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();


  {/* ///////////////////////UPLOAD IMAGE COLLECTION LOCALSTORAGE/////////////////// */}
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //console.log("donehgfgjj");
        dispatch(userLoginInfo(null));
       localStorage.removeItem("userLoginInfo");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.log("errorrrr.code");
      });
  };
  let handleProfileModal = () => {
    setProfileModal(true);
  };
  // console.log(profileModal)

  {/* ///////////////////////UPLOAD IMAGE CHANGE/////////////////// */}

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  {/* ///////////////////////UPLOAD IMAGE CROP/////////////////// */}

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          //console.log(downloadURL, "downloadURL");
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            update(dref(db, 'users/' + data.uid),{
              img: downloadURL,
            })
            setProfileModal(false);
            setImage("");
            setCropData("");
          });
        });
      });
    }
  };

  return (
    <>
      <div className="bg-primary h-[954px] rounded-lg pt-[38px]">
        {/* ///////////////////////UPLOAD IMAGE/////////////////// */}
        <div className="w-[90px] h-[90px] mx-auto rounded-full relative overflow-hidden group cursor-pointer">
          <img
            src={data.photoURL}
            alt=""
            className="cursor-pointer w-full h-full"
          />

          <div
            onClick={handleProfileModal}
            className="w-0 h-full group-hover:w-full bg-[rgba(0,0,0,.4)] absolute top-0 left-0 flex justify-center items-center"
          >
            <BsCloudUpload className="text-white" />
          </div>
        </div>
        <h2 className="text-[20px] font-bold font-popi text-center mt-[20px] text-white">{data.displayName}
        </h2>
        {/* ///////////////////////UPLOAD IMAGE/////////////////// */}

        {/* ///////////////////////HOME START/////////////////// */}
      <div className={`relative mt-[50px] py-[20px] after:absolute after:content[""] ${active == 'home' && 'after:bg-white' } after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg before:absolute before:content[""] before:bg-primary before:top-0 before:right-[0px] before:w-[8px] before:h-full  before:rounded-l-lg`}>
          <Link to="/">
            <BiHomeSmile className={`text-4xl ${active == 'home' ? 'text-primary' : 'text-white'} mx-auto cursor-pointer font-bold`} />
          </Link>
        </div>
        {/* ///////////////////////HOME END/////////////////// */}
        
        {/* ///////////////////////MESSAGE/////////////////// */}
        
      <div className={`relative mt-[50px] py-[20px] after:absolute after:content[""] ${active == 'msg' ? 'after:bg-white' : 'after:bg-transparent'} after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg before:absolute before:content[""] before:bg-primary before:top-0 before:right-[0px] before:w-[8px] before:h-full  before:rounded-l-lg`}>
          <Link to="/msg">
            <AiOutlineMessage className={`text-4xl ${active == 'msg' ? 'text-primary' : 'text-white'} mx-auto cursor-pointer`} />
            </Link> 
          </div>
          {/* ///////////////////////MESSAGE/////////////////// */}

          {/* ///////////////////////Notifications/////////////////// */}
        
        <div className="mt-[60px]">
          <IoIosNotificationsOutline className=" text-5xl text-white mx-auto cursor-pointer" />
        </div>
        {/* ///////////////////////Notifications/////////////////// */}

        {/* ///////////////////////SETTINGS START/////////////////// */}
        <div className="mt-[60px]">
          <AiOutlineSetting className=" text-4xl text-white mx-auto cursor-pointer" />
        </div>
       {/* ///////////////////////SETTINGS END/////////////////// */}

       {/* ///////////////////////UPLOAD IMAGE/////////////////// */}
        <div className="mt-[170px]">
          <LiaFileExportSolid
            onClick={handleSignOut}
            className=" text-4xl text-white mx-auto cursor-pointer"
          />
        </div>
      </div>
      {profileModal && (
        <div className="w-full h-screen bg-red-500  flex justify-center items-center absolute top-0 left-0 z-[1] ">
          <div className="w-[500px] bg-white rounded-2xl text-center p-12">
            <h2 className="text-[20px] font-bold font-popi text-center mt-4">
              upload Your Profile Photo
            </h2>
            <input
              onChange={onChange}
              type="file"
              className="mt-4 block mx-auto mb-5"
            />
            {image ? (
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden mx-auto">
                <div
                  className="img-preview"
                  style={{ width: "100%", float: "left", height: "300px" }}
                />
              </div>
            ) : (
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden mx-auto">
                {/* <img src={data.photoURL} alt="" /> */}
              </div>
            )}

            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            )}
            {/* </div> */}

            <button
              onClick={getCropData}
              className="bg-primary py-3 px-2 text-white rounded-lg"
            >
              upload
            </button>
            <button
              onClick={() => setProfileModal(false)}
              className="bg-red-500 py-3 px-2 text-white ml-5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* ///////////////////////UPLOAD IMAGE/////////////////// */}
    </>
  );
};

export default Sidebar;
