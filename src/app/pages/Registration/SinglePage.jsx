import React from "react";
import Button from "./Button";

const SinglePage = ({ img, title, des, placeholder, handleChange }) => {
  return (
    <>
     <div className="w-1/2 flex justify-end mr-[69px]  ">
        <div className="mt-[225px]">
          <h2 className="font-nuni font-bold text-[#11175D] text-[34px]">
            {title} </h2>
          <p className="font-nuni font-normal text-[#11175D] text-[20px]">
           {des}<span className="text-[#808080]">{}des</span> {des}
          </p>

          <div className="mt-[60px] relative">
            <input className="w-[369px] border border-[ #b8bacf] rounded-lg outline-none py-[26px] px-[52px] " 
            type="text" placeholder={placeholder} onChange={handleChange}/>
            <p className="absolute top-[-8px] left-[34px] px-[18px] bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px]">Email Address</p>
          </div>
          <div className="mt-[60px] relative">
            <input className="w-[369px] border border-[ #b8bacf] rounded-lg outline-none py-[26px] px-[52px] " 
            type="text" placeholder={placeholder} onChange={handleChange}/>
            <p className="absolute top-[-8px] left-[34px] px-[18px] bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px]">Full name</p>
          </div>
          <div className="mt-[60px] relative">
            <input className="w-[369px] border border-[ #b8bacf] rounded-lg outline-none py-[26px] px-[52px] " 
            type="text" placeholder={placeholder} onChange={handleChange}/>
            <p className="absolute top-[-8px] left-[34px] px-[18px] bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px]">Password</p>
          </div>
          <div className="w-96 text-center mt-[51px]">
          <div className="bg-primary rounded-full">
            <Button>Sign up</Button>
            {/* <button onClick={onDecrease} className='bg-[#94634b] px-2 text-white rounded'>-</button>
                            <span className="px-2">
                                {quantity}
                            </span>
                            <button onClick={onIncrease} className='bg-[#94634b] px-2 text-white rounded'>
                                +
                            </button> */}
          </div>
          <p className="font-open text-[#03014C] text-[13px] mt-[35px]">
           {des}<span className="text-[#EA6C00] font-bold">{}des</span> {des}
          </p>
          </div>
         
        </div>
      </div>
      <div className="w-1/2">
        <img
          src={registration}
          alt=""
          className="h-screen w-full object-cover"
        />
      </div>
    
    </>
  )
 };
export default SinglePage;


      

         