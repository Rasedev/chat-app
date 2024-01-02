import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ForgotPassword = () => {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [emailerr, setEmailerr] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };

  const handleSubmit = () => {
    console.log("Play");
    if (!email) {
      setEmailerr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        setEmailerr("Email is Invaliad");
      }
    }
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      sendPasswordResetEmail(auth, email)
  .then(() => {
   console.log('send')
   setEmail('')
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
  });
      console.log("ok");



      //     signInWithEmailAndPassword(auth, email, password)
      //     .then(() => {
      //       sendEmailVerification(auth.currentUser)
      //    .then(() => {
      //      toast.success('Login successful')
      //       // setEmail('')
      //       // setPassword('')
      //       // setTimeout(()=>{
      //       //   navigate('/login')
      //       // },3000)
      // });

      //     })
      //     .catch((error) => {
      //       const errorCode = error.code;
      //     //  console.log(errorCode)
      //     //   if(errorCode.includes('auth/email-already-in-use')){
      //     //     setEmailerr('Email already in use')
      //     //   }
      //     });
    }
  };

  return (
    <div className="h-screen bg-primary w-full flex justify-center item-center">
      <div className="bg-white w-1/2 rounded p-5 relative absolute top-[25%] h-[375px]">
        <h2 className="font-nuni font-bold text-[#11175D] text-[34px]">
          Forgot Password!
        </h2>
        <div className="mt-[60px] relative w-[369px]">
          <input
            onChange={handleEmail}
            value={email}
            className="w-full border-b-2 border-[ #b8bacf] outline-none py-[26px] "
            type="email"
            placeholder="Youraddres@email.com"
          />
          <p className="absolute top-[-8px] left-[0px]  bg-white font-nuni font-semibold text-[#11175D] text-[13px] tracking-[1px]">
            Email Address
          </p>
          {emailerr && (
            <p className="w-[369px] text-[13px] font-nuni text-bold text-[#11175D] bg-red-500 p-[5px] rounded mt-[5px]  text-center">
              {emailerr}
            </p>
          )}
        </div>
          
          <div className="mt-[20px]">
            
          <button onClick={handleSubmit} href=""
                className="font-nuni font-semibold text-white text-[16px] py-[18px] bg-primary p-5 rounded-lg">reset </button>
              <button href="" 
                className="ml-[20px] font-nuni font-semibold text-white text-[16px] py-[20px] bg-primary p-5 rounded-lg"><Link to='/login'>Back to login</Link> </button>
            
          </div>
       
      </div>
    </div>
  );
};

export default ForgotPassword;
