import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from '../../Components/Sidebar/Sidebar';
import GroupList from '../../Components/GroupList/GroupList';
import { userLoginInfo } from '../../Redux/slices/userSlice';
import FriendRequest from '../../Components/FriendRequest/FriendRequest';
import Friends from '../../Components/Friends/Friends';
import UserList from '../../Components/UserList/UserList';
import MyGroup from '../../Components/MyGroup/MyGroup';
import BlockedUsers from '../../Components/BlockedUsers/BlockedUsers';



const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate ()
  const dispatch = useDispatch()
  const data = useSelector (state => state.userLoginInfo.userInfo)
  const [verify, setVerify] = useState (false)

  useEffect(() => {
    if(!data){
      navigate('/login')
    }
  },[])

  onAuthStateChanged(auth, (user) => {
    console.log(user,'userrr23456')
    if(user.emailVerified){
      setVerify(true)
      dispatch(userLoginInfo(user))
          localStorage.setItem('userLoginInfo', JSON.stringify((user)))
         // localStorage.removeItem('user')
        //  localStorage.clear()
        //  console.log(clear)
    }
  });

  return (
    <div>
      {
        verify ?
        <div className="flex">
          <div className="w-[186px] py-4">
            <Sidebar active='home'/>
            </div>
       
          <div className="w-[420px]">
            <GroupList/>
            <FriendRequest/>        
          </div>
          
          <div className="w-[450px]">
            <Friends/>
            <MyGroup/>
            </div>
         
          <div className="w-[450px]">
            <UserList/>
            <BlockedUsers/>
            </div>
          
          {/* <div className="w-[344px]">Friends</div>
          <div className="w-[344px]">User List</div> */}
        </div>
        :
       <div className="h-screen w-full bg-primary flex justify-center items-center">
        <div className="bg-white w-[700px] rounded p-20">
        <h1 className="font-nuni font-bold text-[#11175D] text-[34px]">Please Verify</h1>
        <button>
          <Link to='/login'> Back to Login</Link>
         </button>
        </div>
       </div>
      }
    </div>
  )
}

export default Home