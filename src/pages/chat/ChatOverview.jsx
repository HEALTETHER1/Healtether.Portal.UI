import { useCallback, useContext, useEffect, useState } from "react";
import defaultUploadImg from "assets/images/upload_image.jpg";
import SenderBubble from "./SenderBubble";
import ReceiverBubble from "./ReceiverBubble";
import SideBar from "./SideBar";
import DefaultTextboxClass from "utils/Classes";
import ChatStartPage from "./ChatStartPage";
import {
  GetMessageForChats,
  MarkAsReaded,
  SendLiveMessage,
} from "../../services/whatsapp/livechat";
import InfiniteScroll from "react-infinite-scroll-component";
import store from "../../store/store";
import { SocketContext } from "../../context/socket";
function ChatOverview() {
  const socket = useContext(SocketContext);

  const { currentClinic } = store.getState();
  let pgSize = 10;

  const [currentChatRoom, SetCurrentChatRoom] = useState("");
  const [pg, SetPg] = useState(1);
  const [hasMore, SetHasMore] = useState(true);
  const [data, setData] = useState([]);
  const [onStart, SetOnStart] = useState(true);
  const [patientName, SetpatientName] = useState("");
  const [chatMobile, SetChatMobile] = useState("");
  const [chatMesssage, SetChatMessage] = useState("");

  const [isAttachmentDivOpen, setIsAttachmentDivOpen] = useState(false);

  const [chatData, SetChatData] = useState("");

  const handleAttachmentButtonClick = () => {
    setIsAttachmentDivOpen(!isAttachmentDivOpen);
  };
  useEffect(() => {
    // here is componentDidMount

    socket.on("connect", onConnect);
    socket.on("message", SetChatMessageData);
    if (currentClinic?.clinic?._id != null) {
      socket.emit("ConnectRoom", "Room-" + currentClinic?.clinic?._id);
    }
    return () => {
      socket.off("connect", onConnect);
      socket.off("message", SetChatMessageData);
      socket.emit("DisconnectRoom", "Room-" + currentClinic?.clinic?._id);
      socket.emit("DisconnectRoom", lastRoomId);
    };
  }, []);
  var lastRoomId = "";
  function onConnect() {
    if (lastRoomId != null && lastRoomId != "") {
      socket.emit("ConnectRoom", lastRoomId);
    }
    if (currentClinic?.clinic?._id != null) {
      socket.emit("ConnectRoom", "Room-" + currentClinic?.clinic?._id);
    }
  }

  const ChangeChatRoom = useCallback((roomId) => {
    if (roomId != "" && lastRoomId != roomId) {
      if (lastRoomId != null && lastRoomId != "") {
        socket.emit("DisconnectRoom", lastRoomId);
      }
      socket.emit("ConnectRoom", roomId);
      lastRoomId = roomId;
    }
  }, []);
  // Receive Message From Socket and Set in State
  var SetChatMessageData = (arg) => {
    SetChatData(() => arg);
  };
  // From State Update Chat message
  useEffect(() => {
    // here is componentDidMount
    if (chatData != "") {
      var content = [...data];
      var prevIndex = -1;
      var alreadyExists = content.filter((x, i) => {
        if (x._id == chatData._id) {
          prevIndex = i;
          return true;
        }
      });
      if (alreadyExists.length > 0) {
        content[prevIndex] = chatData;
        setData(content);
      } else {
        var newChat = [];
        newChat.push(chatData);
        var appended = newChat.concat(content);
        setData(appended);
      }
    }
  }, [chatData]);
  async function OnChatSelection(mobile, patientName) {
    SetOnStart(false);
    if (chatMobile != mobile) {
      SetpatientName(patientName);
      SetChatMobile(mobile);
      var roomId = "ChatRoom-" + currentClinic?.clinic?._id + "-" + mobile;
      ChangeChatRoom(roomId);
      SetCurrentChatRoom(() => roomId);

      var response = await GetMessageForChats(mobile, 1, pgSize);
      if (response.status == 200) {
        SetPg(() => 2);
        SetHasMore(() => !(response.data.length == 0));
        var chatContent = response.data;
        setData(chatContent);
        await MarkAsReaded(mobile);
      }
    }
  }

  async function SendMessageToWhatsapp() {
    if (chatMobile != null && chatMobile != "") {
      var response = await SendLiveMessage(chatMobile, chatMesssage);
      if (response.status == 200) {
        SetChatMessage("");
      }
    }
  }
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await SendMessageToWhatsapp();
    }
  };

  /// scroll data

  async function fetchData(limit = 10) {
    SetPg(pg + 1);
    var response = await GetMessageForChats(chatMobile, pg, pgSize);
    if (response.status == 200) {
      if (response.data?.length == 0) {
        SetHasMore(() => false);
      } else {
        var content = [...data];
        var newChat = content.concat(response.data);
        setData(newChat);
        SetHasMore(() => true);
      }
    }
  }

  return (
    <div className="flex flex-col h-full p-6">
      <div
        className="flex flex-row  max-sm:flex-col-reverse border border-px shadow-md h-full rounded-2xl"
        id="chatbox"
      >
        <SideBar onSelect={OnChatSelection} />{" "}
        {onStart ? (
          <ChatStartPage />
        ) : (
          <div className="w-3/4 h-full">
            {/* chat header */}
            <div
              className="flex items-center gap-5 rounded-tr-2xl bg-[#128C7E] h-[12%] bg-SilverTree shadow-inner shadow"
              style={{
                height: "12%",
              }}
              id="whatsappHeader"
            >
              <div className="pl-8">
                <img
                  className="max-h-10 max-w-full"
                  alt="Rectangler"
                  src={defaultUploadImg}
                />
              </div>
              <div className="leading-6 text-white fond-normal  text-xl  ">
                {patientName}
              </div>
            </div>

            {/* chat content */}
            <div
              id="whatsappInnerLayout"
              className="relative flex flex-col-reverse  overflow-y-scroll scroll-smooth bg-[url('assets/images/whatsappchatbg.jpg')] bg-repeat border-[#128C7E] border-r"
              style={{
                height: "78%",
                overflowY: "auto",
              }}
            >
              <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<p className="text-center m-5"> ⏳ Loading ...</p>}
                endMessage={
                  <p className="text-center m-5"> no message ...!🐰🕕 </p>
                }
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  overflow: "visible",
                }}
                scrollableTarget="whatsappInnerLayout"
                inverse={true}
              >
                {data.map((z, i) =>
                  !z.isReceived ? (
                    <SenderBubble
                      message={z.message}
                      key={i + 1}
                      timestamp={z.createdOn}
                      indexer={i + 1}
                      delivered={z.isDelivered}
                    />
                  ) : (
                    <ReceiverBubble
                      key={i + 1}
                      message={z.message}
                      timestamp={z.createdOn}
                      indexer={i + 1}
                      delivered={z.isReceived}
                    />
                  )
                )}
              </InfiniteScroll>

              {isAttachmentDivOpen && (
                <div className="fixed z-10 bottom-20 right-5 bg-white rounded-md shadow-md py-[17px] px-[25px] w-[390px] h-[173px]">
                  <div className="flex items-center justify-between  px-4">
                    <div>
                      <span>ADD FILES</span>
                    </div>
                    <button
                      onClick={handleAttachmentButtonClick}
                      className="flex items-center   text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 rounded-md"
                    >
                      <i className="icon-[gg--close-r] text-[30px]"></i>
                    </button>
                  </div>
                  <div className="mt-4 flex  gap-4">
                    <button className="flex flex-col items-center justify-center px-2 py-2 text-sm font-medium text-white bg-[#369158] rounded-md">
                      <i className="icon-[mdi--people-add] text-[30px]"></i>
                      <div>Schedule Appointment</div>
                    </button>
                    <button className="flex flex-col items-center justify-center px-2 py-2 text-sm font-medium text-white bg-[#369158]  rounded-md">
                      <i className="icon-[tabler--files] text-[30px]"></i>
                      <div>Schedule Appointment</div>
                    </button>
                    <button className="flex flex-col items-center justify-center px-2 py-2 text-sm font-medium text-white bg-[#369158]  rounded-md">
                      <i className="icon-[material-symbols--prescriptions-outline] text-[30px]"></i>
                      <div>Schedule Appointment</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex  border border-l-0 rounded-br-xl shadow-inner border-[#128C7E] bg-[#FBFAFC]"
              style={{
                height: "10%",
              }}
              id="whatsappFooter"
            >
              <div className=" flex flex-row items-center justify-center  text-gray-600 w-full">
                <div
                  className="flex w-[7.5%] items-center justify-center"
                  onClick={handleAttachmentButtonClick}
                >
                  <i className="icon-[teenyicons--attach-outline] text-xl bg-green-900 hover:text-gray-800"></i>
                </div>
                <div className="flex items-center w-[85%] justify-center">
                  <input
                    type="text"
                    placeholder="Type your message here"
                    value={chatMesssage}
                    onChange={(e) => SetChatMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={
                      "bg-white " + DefaultTextboxClass + " w-full rounded-full"
                    }
                  />
                </div>
                {/* <button type='button' className="absolute bottom-0 right-0 top-2 ">
                                <i className='icon-[ic--round-mic] text-lg text-gray-500 hover:text-gray-800'></i>
                            </button> */}
                <div
                  className="flex w-[7.5%] items-center justify-center"
                  onClick={SendMessageToWhatsapp}
                >
                  <i className="icon-[majesticons--send] text-[25px] bg-green-900"></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatOverview;
