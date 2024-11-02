export default function PastHistorySidebar({ pastHistory, procedure, medication, allergies }) {
    const loading = false;
    return (
        <div className="w-full rounded-lg gap-6  border bg-white drop-shadow-lg  p-4">

            <p className="text-md text-center">
                Past History
            </p>
            <div className="flex flex-col gap-2 ">
                <div className="flex flex-col justify-center align-middle w-full ">
                    <label className="font-normal text-sm text-BreadcrumbText">
                        Family History
                    </label>
                    <div className={(loading ? "animate-pulse" : "") + " border-none bg-[#F7F7F7] w-full rounded-md text-sm px-2.5 py-2 truncate "}>
                         {pastHistory?.map((item)=> item.name+", ")}
                    </div>
                </div>

                <div className="flex flex-col justify-center align-middle w-full ">
                    <label className="font-normal text-sm text-BreadcrumbText">
                        Medical Procedure
                    </label>
                    <div className={(loading ? "animate-pulse" : "") +" border-none bg-[#F7F7F7] w-full rounded-md text-sm px-2.5 py-2 animate-pulse"}>
                         {procedure?.map((item)=> item.name+", ")}
                    </div>
                </div>
                <div className="flex flex-col justify-center align-middle w-full ">
                    <label className="font-normal text-sm text-BreadcrumbText">
                        Medication
                    </label>
                    <div className={(loading ? "animate-pulse" : "") +" border-none bg-[#F7F7F7] w-full rounded-md text-sm px-2.5 py-2 "}>
                         {medication?.map((item)=> item.name+", ")}
                    </div>
                </div>
                <div className="flex flex-col justify-center align-middle w-full ">
                    <label className="font-normal text-sm text-BreadcrumbText">
                        Allergies
                    </label>
                    <div className={(loading ? "animate-pulse" : "") +" border-none bg-[#F7F7F7] w-full rounded-md text-sm px-2.5 py-2 "}>
                         {allergies?.map((item)=> item.name+", ")}
                    </div>
                </div>
            </div>
        </div>
    )

}