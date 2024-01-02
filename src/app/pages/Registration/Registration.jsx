import React, { useState } from "react";
import registration from "../../../assets/reg.png";
import {PiEyeClosed, PiEye} from 'react-icons/pi'
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import { getDatabase, ref, set } from "firebase/database";



const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate()
   const [email, setEmail] = useState ('')
   const [fullName, setFullName] = useState ('')
   const [password, setPassword] = useState ('')


   const [emailerr, setEmailerr] = useState ('')
   const [fullNameerr, setFullNameerr] = useState ('')
   const [passworderr, setPassworderr] = useState ('')
   
   const [showPassword, setShowPassword] = useState(false)
   const [success, setSuccess] =useState('')

   const [loading, setLoading] = useState(false)

   //const [isPTag, setPTag] = useState(true);


   const handleEmail = (e) => {
    setEmail(e.target.value)
     setEmailerr('')
   }
   const handleFullName = (e) => {
    setFullName(e.target.value)
    setFullNameerr('')
   }

   const handlePassword = (e) => {
    setPassword(e.target.value)
    setPassworderr('')
   }

  const handleSubmit = () => {
    console.log("Play");
    if(!email){
      setEmailerr('Email is required' )  

    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailerr('email is Invaliad')
      }
      
    }
    if(!fullName){
      setFullNameerr('FullName is required')
    }
    if(!password){
      setPassworderr('password is required')
      
    }
    if(email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)   
      .then((user) => {
        updateProfile(auth.currentUser, {
          displayName: fullName, 
          photoURL: './src/assets/de.jpeg',          
        }).then(() => {
          sendEmailVerification(auth.currentUser)
          console.log(user, 'user')
            toast.success('Regigtration Done & please verify your email')
                setEmail('')
                setFullName('')
                setPassword('')               
                setTimeout(()=>{
                  setLoading(false)
                  navigate('/login')
                }, 3000)       
        }).then(() => {
          console.log(user.user.displayName, 'raiyan')
          set(ref(db,'users/' + user.user.uid), {
            username: user.user.displayName,
            email: user.user.email,
           
          });
        })
        
      })

      .catch((error) => {
        const errorCode = error.code;
       console.log(errorCode)
        if(errorCode.includes('auth/email-already-in-use')){
          setEmailerr('Email already in use')
        }
      });
    }
   
    // else if(!/^(?=.*[a-z])/.test(password)){
    //   setPassworderr('The string must contain at least 1 lowercase alphabetical character')
    // }else if(!/^(?=.*[A-Z])/.test(password)){
    //   setPassworderr('The string must contain at least 1 uppercase alphabetical character')
    // }else if(!/^(?=.*[0-9])/.test(password)){
    //   setPassworderr('The string must contain at least 1 numeric character')
    // }else if(!/^(?=.*[!@#\$%\^&\*])/.test(password)){
    //   setPassworderr('The string must contain at least 1 special character')
    // }else if(!/^(?=.*[8,])/.test(password)){
    //   setPassworderr('The string must be eight characters or longer')
    // }
   
}
  
  
  return (
    <div className="flex">
      <div className="w-1/2 flex justify-end mr-[69px]">
      <ToastContainer
       position="top-center"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
      />

        <div className="mt-[225px]">
          <h2 className="font-nuni font-bold text-[#11175D] text-[34px]">
            Get started with easily register
          </h2>
          <p className="font-nuni font-normal text-[#11175D] text-[20px]">
            Free register <span className="text-[#808080]">and</span> you can
            enjoy it
          </p>
          {/* <p className="font-nuni font-normal text-[#11175D] text-[20px] bg-green-500">{success}</p> */}

          <div className="mt-[60px] relative w-[369px]">
            <input onChange={handleEmail} value={email}
              className="w-full border border-[ #b8bacf] rounded-lg outline-none py-[26px] px-[52px] "
              type="email"
              placeholder=""
            />
            <p className="absolute top-[-8px] left-[34px] px-[18px] bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px] z-10">
              Email Address
            </p>
            {
              emailerr && 
              (<p className="w-[369px] text-[13px] font-nuni text-bold text-[#11175D] bg-red-400 p-1 rounded mt-[5px] text-white text-center">{emailerr}</p>)
            }
           {/* {
           emailerr && isPTag ?
            (<p  onClick={() => setPTag(false)} className="w-[369px] absolute top-[0px] text-[13px] font-nuni text-bold text-[#11175D] py-[28px] px-[52px] border border-red-300 rounded mt-[0px] bg-white text-center">{emailerr}</p>)
            :
            (<input 
            className="w-full absolute bottom-[0px] bg-transparent left-[0px] text-center outline-red-300 py-[27px]"
            onClick={() => setPTag(true)} type="text" 
            
            />)
           } */}
           
          </div>
          <div className="mt-[60px] relative w-[369px]">
            <input onChange={handleFullName} value={fullName}
              className="w-full border border-[ #b8bacf] rounded-lg outline-none py-[26px] px-[52px] "
              type="text"
              placeholder=""
            />
            <p className="absolute top-[-8px] left-[34px] px-[18px] bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px] z-10">
              Full name
            </p>
            {
           fullNameerr && 
           <p className="w-[369px] text-[13px] font-nuni text-bold text-[#11175D] bg-red-400 p-1 rounded mt-[5px] text-white text-center">{fullNameerr}</p>
           }
           {/* {
           fullNameerr && isPTag ?
            (<p  onClick={() => setPTag(false)} className="w-[369px] absolute top-[0px] text-[13px] font-nuni text-bold text-[#11175D] py-[28px] px-[52px] border border-red-300 rounded mt-[0px] bg-white text-center">{fullNameerr}</p>)
            :
            (<input 
            className="w-full absolute bottom-[0px] bg-transparent left-[0px] text-center outline-red-300 py-[27px]"
            
            autoFocus onClick={() => setPTag(true)} type="text" 
            
            />)
           } */}

          </div>
          <div className="mt-[60px] relative w-[369px]">
            <input onChange={handlePassword} value={password}
              className="w-full border border-[ #b8bacf] rounded-lg outline-none py-[26px] px-[52px] "
              type={showPassword ? 'text' : 'password'}
              placeholder=""
            />
            <p className="absolute top-[-8px] left-[34px] px-[18px] bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px] z-10">
              Password
            </p>
           {
            showPassword  ?
            <PiEye onClick={()=> setShowPassword(!showPassword)} className="absolute top-[30px] right-[25px]"/>
            :
            <PiEyeClosed onClick={()=> setShowPassword(!showPassword)} className="absolute top-[30px] right-[25px]"/>
           }
            {
           passworderr && 
           <p className="w-[369px] text-[13px] font-nuni text-bold text-[#11175D] bg-red-400 p-1 rounded mt-[5px] text-white text-center ">{passworderr}</p>
           
           }
            
          </div>


          <div className="w-96 text-center mt-[50px]">
           {
            loading ?
            <ColorRing
           visible={true}
           height="80"
           width="80"
           ariaLabel="blocks-loading"
           wrapperStyle={{}}
           wrapperClass="blocks-wrapper"
           colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
         />
         :
         <div
         onClick={handleSubmit}
         className="bg-primary rounded-full cursor-pointer"
       >
         <button
           href=""
           className="font-nuni font-semibold text-white text-[20px] py-[20px] inline-block"
         >
           Sign up
         </button>
       </div>
           }
           

            <p className="font-open text-[#03014C] text-[13px] mt-[35px]">
              Already have an account ?{" "}
              <span className="text-[#EA6C00] font-bold"><Link to='/login'>Sign In</Link></span>
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
    </div>
  );
};

export default Registration;
