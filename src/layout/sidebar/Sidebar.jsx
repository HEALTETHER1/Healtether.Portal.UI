import { Link, NavLink, useLocation} from 'react-router-dom'
import {useSelector} from "react-redux"
import defaultLogo from "assets/images/healtether-logo.png";
import secondLogo from "assets/images/HealTetherLogo.png";
import {useState} from "react";
import PropTypes from "prop-types";

export default function Sidebar({isOpen,toggleSiderbar}){
    const [selectedMenu, setSelectedMenu] = useState(false);
    const location = useLocation();
    const {user}=useSelector((state) => state.user);
    const {clinic}=useSelector((state) => state.currentClinic);
    let SuperAdmin=user.isSuperAdmin;
    let admin=user.isSuperAdmin;
    for (let index = 0; index < user.linkedClinics.length && !admin; index++) {
        const linkedClinic = user.linkedClinics[index];

       var isCurrent= linkedClinic?.clinic?._id==clinic._id;

       if(isCurrent)
        {
            admin=linkedClinic.isAdmin;
            break;
        }
    }
/*const LogutUser= async(e) =>{

    confirm({
        show: true,
        title: 'Logout',
        proceed: async () => {
          dispatch(removeUser());
       return dispatch(logout());
        },
        confirmation: 'Are you sure you want to logout '
    })
    e.stopPropagation();
}*/

   

    const menuHtml = [];
    const menu = [
        {
            title: "Home",
            icon: "icon-[system-uicons--home] text-2xl",
            cssclass: "block  py-3  transition duration-200 ",
            route: "dashboard",
            path: "dashboard",
            role:"All"
        }, {
            title: "Appointments",
            icon: "icon-[solar--calendar-linear] text-2xl",
            cssclass: "block py-3   transition duration-200 ",
            route: "appointment",
            path: "appointment",
            role:"All"
        }, {
            title: "WhatsApp Chat",
            icon: "icon-[ion--logo-whatsapp] text-2xl",
            cssclass: "block py-3   transition duration-200 ",
            route: "chats",
            path: "chats",
            role:"All"
        },  
        {
            title: "Patients Record",
            icon: "icon-[ooui--user-contributions-ltr] text-2xl",
            cssclass: "block  py-3   transition duration-200 ",
            route: "patient/managepatient",
            path: "patient",
            role:"All"
        },
        {
            title: "Manage Staff",
            icon: "icon-[medical-icon--i-care-staff-area] text-2xl ",
            cssclass: "block  py-3  transition duration-200  ",
            route: "staff/managestaffs",
            path: "staff",
            role:"Admin"
        },
        {
            title: "Payments",
            icon: "icon-[streamline--money-wallet-money-payment-finance-wallet] text-2xl",
            cssclass: "block py-3  transition duration-200 ",
            route: "payments",
            path: "payments",
            role:"All"
        },
        {
            title: "Analytics",
            icon: "icon-[ion--trending-up-outline] text-2xl ",
            cssclass: "block py-3  transition duration-200 " ,
            role:"Admin",
            route: "analytics",
            path: "analytics",
        },
      /*  {
            title: "Logout",
            icon: "icon-[ant-design--logout-outlined] text-2xl",
            cssclass: "block py-3  transition duration-200 ",
            route: "",
            role:"All"
        }*/
        
    ];

    const selectedMenuCss="bg-BgPrimary border-r-2 border-r-[#110C2C]";
    menu.forEach((item,i) => {
        const isActive = location.pathname.includes(item.path);
       
        if((item.role=="Admin" && admin) || item.role=="All" || (item.role=="SuperAdmin" && SuperAdmin))
        menuHtml.push(
       /*     item.title !== "Logout" ?  */
                <Link to={item.route} className={item.cssclass+ ` hover:bg-BgPrimary hover:border-r-2 hover:border-r-[#110C2C]   ${isActive ? selectedMenuCss: ""} `} key={i} onClick={() => setSelectedMenu(item.route)}>
                <div className='flex justify-start pl-5 content-center' >
                    <span className={item.icon}></span>
                    {isOpen? <span className=' ml-3 '>{item.title}</span>:<></>}
                </div>
            </Link >
   /* :
            <div onClick={LogutUser} className={item.cssclass+" cursor-pointer hover:bg-BgPrimary hover:border-r-2 hover:border-r-[#110C2C]"} key={i}>
        <div className='flex justify-start pl-5 content-center' >
            <span className={item.icon}></span>
            {isOpen? <span className=' ml-3 '>{item.title}</span>:<></>}
        </div>
            
            </div>*/
        );
    });
    return(
        <>
        <div className="h-[13%] w-full grid justify-center content-center pt-2">

            {isOpen ?
                <img
                    src={defaultLogo}
                    className=" h-full max-h-[73px] transition-all ease-in-out duration-500 p-3"
                    alt="main_logo"/> :
                <img
                    src={secondLogo}
                    className=" h-full max-h-[73px] p-2 transition-all ease-in-out duration-500"
                    alt="main_logo"/>
            }


        </div>
            <div className='h-[87%] overscroll-y-auto '>
                <nav className="text-TextPrimary space-y-4 mt-3 ">
                <div className="flex items-center justify-center ">
                 <NavLink
                        to={'scheduleappointment'}
                        className="bg-Primary inline-block shadow-sm rounded-lg px-2.5 py-1 h-[34px]  w-fit flex text-sm  items-center justify-center text-white ">
                     {isOpen? <span >Schedule Appointment</span>:<span className="icon-[akar-icons--schedule] text-2xl"></span>}
                    </NavLink>
                    </div>
        {menuHtml}
         </nav>
    </div>
            <div className="pr-3.5 mb-2 flex justify-end ">
                {isOpen?
                 <span
                     className="text-Primary icon-[solar--round-double-alt-arrow-left-bold] text-4xl cursor-pointer transition-all delay-700 " onClick={()=>toggleSiderbar()} ></span>:
                <span
                    className="text-Primary icon-[solar--round-double-alt-arrow-right-bold] text-4xl cursor-pointer transition-all delay-700" onClick={()=>toggleSiderbar()}></span>}

            </div>
        </>
    );
}

Sidebar.propTypes={
    isOpen:PropTypes.bool,
    toggleSiderbar:PropTypes.func,
}