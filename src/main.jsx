import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from './app/pages/Registration/Registration.jsx';
import Login from './app/pages/Login/Login.jsx'
import Home from './app/pages/Home/Home';
import firebaseConfig from './app/Utlis/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './app/pages/ForgotPassword/ForgotPassword';
import store from './app/Redux/store.jsx'; 
import { Provider } from 'react-redux';
import Message from './app/pages/Message/Message.jsx';



const router = createBrowserRouter([
 
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/Registration",
    element: <Registration/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Msg",
    element: <Message/>,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>,
)
