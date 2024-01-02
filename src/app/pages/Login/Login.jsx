import React, { useState } from "react";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import login from "../../../assets/log.png";
import gog from "../../../assets/goggle.png";
//import registration from "../../../assets/reg.png";
import { ColorRing } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../Redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailerr, setEmailerr] = useState("");
  const [passworderr, setPassworderr] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
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
    if (!password) {
      setPassworderr("Password is required");
    }

    if (
      email &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)
    ) {
      //setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success("Login successful");
          console.log(user);
          dispatch(userLoginInfo(user));
          localStorage.setItem("userLoginInfo", JSON.stringify(user));
          setError("");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })

        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-login-credentials")) {
            setError("please give your right email & password");
          }
        });

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

  const handlegoggleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

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
            Login to your account!
          </h2>
          {error && (
            <p className="font-nuni bg-red-500 text-white mt-3 p-[10px] text-[20px]">
              {error}
            </p>
          )}
          <div
            onClick={handlegoggleSignIn}
            className="mt-[60px] relative w-[221px]"
          >
            <input className="w-full border border-[ #b8bacf] rounded-lg outline-none py-[26px] px-[52px] cursor-pointer" />

            <p className="flex absolute top-[26px] left-[34px] font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px] cursor-pointer">
              <img src={gog} alt="" className="mr-[10px]" />
              Login with Google
            </p>
          </div>

          <div className="mt-[60px] relative w-[369px]">
            <input
              onChange={handleEmail}
              value={email}
              className="w-[369px] border-b-2 border-[ #b8bacf] outline-none py-[26px] px-[0px] "
              type="email"
              placeholder="Youraddres@email.com"
            />
            <p className="absolute top-[-8px] left-[0px]  bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px]">
              Email Address
            </p>
            {emailerr && (
              <p className="w-[369px] text-[13px] font-nuni text-bold  bg-red-400 p-1 rounded mt-[5px] text-white text-center">
                {emailerr}
              </p>
            )}
          </div>

          <div className="mt-[60px] relative w-[369px]">
            <input
              onChange={handlePassword}
              value={password}
              className="w-[369px] border-b-2 border-[ #b8bacf] outline-none py-[26px] px-[0px] "
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <p className="absolute top-[-8px] left-[0px]  bg-white font-nuni font-normal text-[#11175D] text-[13px] tracking-[1px]">
              Password
            </p>
            {showPassword ? (
              <PiEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[30px] right-[25px]"
              />
            ) : (
              <PiEyeClosed
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[30px] right-[25px]"
              />
            )}
            {passworderr && (
              <p className="w-[369px] text-[13px] font-nuni text-bold  bg-red-400 p-1 rounded mt-[5px] text-white text-center ">
                {passworderr}
              </p>
            )}
          </div>

          <div className="w-96 text-center mt-[50px]">
            {loading ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              <div
                onClick={handleSubmit}
                className="bg-primary rounded-full cursor-pointer"
              >
                <button
                  href=""
                  className="font-nuni font-semibold text-white text-[20px] py-[20px] inline-block"
                >
                  Login to Continue
                </button>
              </div>
            )}

            <p className="font-open text-[#03014C] text-[13px] mt-[35px]">
              Don’t have an account ?{" "}
              <span className="text-[#EA6C00] font-bold">
                <Link to="/registration">Sign Up</Link>
              </span>
            </p>

            <p className="font-open text-[#EA6C00] font-bold text-[13px] mt-[35px] cursor-pointer">
              <Link to="/ForgotPassword">Forgotten Password</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img src={login} alt="" className="h-screen w-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
