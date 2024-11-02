export default function ChatStartPage() {

    return (
        <div className="w-3/4 h-full">
            {/* chat header */}
            <div
                className="flex flex-col content-center items-center rounded-tr-2xl border rounded-br-xl border-l-0 h-full w-full  border-[#52CFAC] bg-SilverTree shadow-inner shadow pl-12 pr-12">
                <div className="flex flex-col w-full mt-[8%]">
                    <div
                        className="font-light  text-6xl border-l-8 pl-4 border-b border-[#52CFAC] ">Chat
                        <span className="flex w-full text-sm font-normal mb-3 mt-2">Forge connections with patients like never before.
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full text-sm font-normal mt-[5%] space-y-3">
                    <span className="w-full font-medium text-base">Connect with your patients via Whatsapp chat feature to -
                    </span>
                    <span className="w-full list-disc">Book and Manage appointments.
                    </span>
                    <span className="w-full list-disc">Share reports, prescriptions and other documents.
                    </span>
                    <span className="w-full">Receive online payments via payment link. 
                    </span>
                </div>
            </div>
        </div>
    );
}