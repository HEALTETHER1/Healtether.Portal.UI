import React, { useEffect, useRef, useState } from 'react'
import { GetAppointmentCountToday } from '../services/appointment/appointment';
import { Link, redirect, useLocation, useNavigate, useParams } from 'react-router-dom';

function AppointmentCard() {
  let loadingHistory = false;
  const ref = useRef(null);
  const [todaysAppointment, setTodaysAppointment] = useState({});
  const { appointmentId, patientId } = useParams();
  const location = useLocation();
  useEffect(() => {
    if (!loadingHistory) {
      loadingHistory = true;
    const GetTodaysAppointment = async () => {
      let result = await GetAppointmentCountToday();
      setTodaysAppointment(result.data.data);
    };
    GetTodaysAppointment();
  }
  }, []);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  var lastRouteInUrl= location.pathname.split('/');
  var routeToNavigate=lastRouteInUrl[lastRouteInUrl.length-1];

  return (
   <div className="flex flex-row">
    <div className="cursor-pointer flex items-center" onClick={() => scroll(-150)}><span className="icon-[ep--arrow-left-bold] text-[15px]"></span></div>
 
  <div className="flex flex-row gap-2 my-2 overflow-hidden w-[70%] scroll-smooth" ref={ref} >
 {todaysAppointment?.length > 0 &&
          todaysAppointment.map((data, i) => (
    <Link to={`/appointment/${data?._id}/${data?.patientId}/${routeToNavigate}`} key={"card_"+i}>
  <div className={((data?.id==appointmentId)?" border-Primary ":"")+" flex flex-col border border-2 rounded-xl px-4 py-2.5 shadow-lg cursor-pointer"} key={"card_"+i} 
          
  >
   
    <div className="font-medium text-sm text-black truncate">{data?.name}</div>
    <div className="font-medium text-xs text-black truncate">
      {data.age}, {data.gender}
    </div>
    <div className="font-light text-xs truncate">{data.mobile}</div>
  </div>
  </Link>
  ))}
</div>
<div className="cursor-pointer flex items-center" onClick={() => scroll(150)}><span className="icon-[ep--arrow-right-bold] text-[15px]"></span></div>
   </div>
  )
}

export default AppointmentCard