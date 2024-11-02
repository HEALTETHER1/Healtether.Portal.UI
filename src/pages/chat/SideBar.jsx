import { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DefaultTextboxClass from 'utils/Classes';
import { AddRecentChat, GetRecentChats } from '../../services/whatsapp/livechat';
import Autocomplete from "components/autoComplete/Autocomplete.jsx";
import AutocompleteModel from "utils/AutocompleteModel";
import { searchPatientMobileMapper } from '../appointment/ScheduleAppointment';
import { SearchPatientMobileApi } from '../../services/patient/patient';
import { SocketContext } from '../../context/socket';
import store from '../../store/store';
export default function SideBar({ onSelect }) {

    let loadingRecent = false;
    const [selectedMenu,
        setSelectedMenu] = useState('');
    const [chatUser,
        SetChatUser] = useState([]);
    const [patientMobile,
        setpatientMobile] = useState("");
    const socket = useContext(SocketContext);
    const { currentClinic } = store.getState();
    const [logData, SetLogData] = useState("");
    useEffect(() => {
        if (!loadingRecent) {
            loadingRecent = true;
            const fetchRecent = async () => {
                var response = await GetRecentChats();
                if (response.status == 200) {
                    var recentChats = response.data;
                    SetChatUser(recentChats);
                }
            }
            fetchRecent();
        }

    }, [loadingRecent]);
    useEffect(() => {
        // here is componentDidMount
        socket.on("recentchatlog", SetRecentLogData);
        
        return () => {
            socket.off("recentchatlog", SetRecentLogData);
        }
    }, []);
    const handleMenuClick = async (data, patientName) => {
        setSelectedMenu(data);
        await onSelect(data, patientName);
    };
    const SetRecentLogData = (arg) => {
        SetLogData(x => arg)
    }
    useEffect(() => {
        if (logData != "") {
            var prev = [...chatUser];
            var prevIndex = -1;
            var alreadyExists = prev.filter((x, i) => {
                if (x._id == logData._id) {
                    prevIndex = i;
                    return true;
                }
            })

            if (alreadyExists.length>0) {
                prev.splice(prevIndex, 1);
            }

            var updateChat = [logData, ...prev];
            SetChatUser(updateChat);
        }
    }, [logData]);
    const GetListOfPatient = (patientArray) => {
        var fullName = ""
        for (let index = 0; index < patientArray.length; index++) {
            const patientName = patientArray[index];
            fullName += patientName
                ?.firstName + " " + patientName
                    ?.lastName + (((patientArray.length - 1) == index)
                        ? ""
                        : " , ");
        }
        return fullName;
    }

    const OnSelectPatient = async (data) => {
        // alert("selected")
        var chat = await AddRecentChat(data.mobile);
        setpatientMobile("");
    }

    return (
        <div
            className="flex flex-col w-1/4 h-full shadow-inner shadow-xl  bg-[#128C7E] rounded-tl-xl rounded-bl-xl  border border-r-0 border-[#128C7E]">


            <div
                className=" w-full  bg-[#FBFAFC] rounded-bl-xl rounded-tl-xl  p-2"
                id='whatsappPatientSidebar'
                style={{
                    height: '100%',
                    overflowY: 'auto'
                }}>
                <div className="flex  mt-4 mb-4 justify-center h-fit">
                    <div className='relative w-11/12'>
                        <Autocomplete options={[]}
                            customClass={"bg-TextBgPrimary w-full  text-md focus:border-transparent focus:ring-Primary caret-Primary hover:border-transparent hover:ring-Primary border border-Primary bg-white rounded-full ring-Primary"}
                            value={patientMobile}

                            placeHolder="Mobile no." name="mobile" setDisable={false}
                            onChange={setpatientMobile} search={SearchPatientMobileApi} searchMapper={searchPatientMobileMapper} onSelect={(data) => { OnSelectPatient(data); }}
                        />
                        {/* <input
                        className="bg-TextBgPrimary  text-md focus:border-transparent focus:ring-Primary caret-Primary hover:border-transparent hover:ring-Primary border border-Primary bg-white rounded-full ring-Primary"
                        type="text"
                        name="search"
                        placeholder="Search chat"/> */}
                        <button type="button" className="absolute right-1 bottom-1">
                            <i className="icon-[system-uicons--search] text-[1.5rem] text-gray-800 mr-1"></i>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <span className="w-full text-center text-TextSecondary text-xs font-light italic mb-2"> Recent conversation</span>
                    {chatUser != null && chatUser.map((z, i) => <div
                        className="p-3 text-base hover:bg-BgPrimary cursor-pointer  truncate"
                        key={i + 1}
                        style={{
                            borderBottom: (selectedMenu === z.mobile)
                                ? "1px solid #f2eadb"
                                : "",
                            borderTop: (selectedMenu === z.mobile)
                                ? "1px solid #f2eadb"
                                : "",
                            boxShadow: (selectedMenu === z.mobile)
                                ? "inset 1px 1px 4px 4px rgb(18 140 126 / 0.05)"
                                : "",
                            backgroundColor: (selectedMenu === z.mobile)
                                ? '#ffffff'
                                : ''
                        }}
                        onClick={() => handleMenuClick(z.mobile, GetListOfPatient(z.patientName))}>

                        <div className="flex flex-row items-center">

                            <span className="ml-px truncate text-base font-medium text-TextPrimary font-['Montserrat']">{GetListOfPatient(z.patientName)}</span>
                            {(z.unReaded && (selectedMenu != z.mobile) ? <span className="relative flex h-3 w-3 ml-4">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#128C7E]"></span>
                            </span> : <></>)}
                        </div>


                    </div>)}

                </div>
            </div>
        </div>
    );
}