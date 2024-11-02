import {useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import Topbar from 'layout/topbar/Topbar'
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Sidebar from '../sidebar/Sidebar';
import {useDispatch} from 'react-redux';
import { notificationMessaging } from '../../google-firebase/firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';
import { setNotificationKey } from '../../store/slice/NotificationKeySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../../components/toast/Message';
import { socket, SocketContext } from '../../context/socket';
// https://tailwindcomponents.com/component/dashboard-administrador-2

export default function Layout() {
    const { VITE_APP_VAPID_KEY } = import.meta.env;
    const dispatch = useDispatch();
    const [openSideBar, setOpenSideBar] = useState(false);
 
      async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();
    
        if (permission === "granted") {
          const token = await getToken(notificationMessaging, {
            vapidKey: VITE_APP_VAPID_KEY,
          });
          dispatch(setNotificationKey({device:token}))
        
        } else if (permission === "denied") {
          //notifications are blocked
          alert("You denied for the notification");
        }
        // var txt=<Message notification={ {
        //   title:"Test",
        //   body:"check test message"
        // }} />;
        // toast.success(txt);
        onMessage(notificationMessaging, (payload) => {
          var txt=<Message notification={payload.notification} />;
          if(payload?.data?.notificationType=="success")
          {
            toast.success(txt);
          }
         else if(payload?.data?.notificationType=="error")
          {
            toast.error(txt);
          }
          else
          {
            toast(txt);
          }
       
         
        });
      }
      let isTokenLoading=false
      useEffect(() => {
        if(!isTokenLoading)
        {
            isTokenLoading=true;
            requestPermission();
           
        }
      }, []);

      let ToggleSidebar=()=>setOpenSideBar((prevState)=>!prevState);


    return (

        <div className="flex flex-col w-screen h-screen">

            <div className="flex-1 flex w-full font-['Montserrat']  h-screen font-medium">
                <div
                    className={ (openSideBar?"w-72 ":"w-16 ") +" bg-white h-screen flex-col lg:flex  md:hidden xs:hidden md:peer-click:flex drop-shadow-lg font-['Montserrat'] font-medium " }
                    id="sideNav">


                   <Sidebar isOpen={openSideBar} toggleSiderbar={ToggleSidebar}/>

                    {/* <div className="bg-gradient-to-r from-teal-300 to-teal-500 h-px mt-auto"></div>
                    <p className="px-5 mt-1 text-left text-xs text-cyan-500">Copyright: Healtether.com@2023</p> */}

                </div>

                <div className="flex flex-col h-screen overscroll-y-auto w-full" >  {/*style={{width:'calc(100% - 225px)'}}*/}
                    <SocketContext.Provider value={socket}>
                    <div id='topbarLayout' className='mr-3 ml-6 border-b border-gray-300' style={{height:'60px'}}>
                    <Topbar/>
                    </div>
                    <div className=" mr-3 ml-6 border-b border-gray-300" id="breadcrumbLayout" style={{height:'50px'}}>
                        <Breadcrumb/>
                    </div>
                        <div id="detailOutlet" className="scroll-smooth hover:scroll-auto  pr-3 pl-6 overscroll-y-auto overflow-y-scroll font-['poppins']" style={{height:'100%'}}>
                            <Outlet/>
                       </div>
                    </SocketContext.Provider>
                </div>

            </div>
            <ToastContainer position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            />
        </div>
    )
}
