import {Tooltip} from "react-tooltip";

export default function MedicalReportSidebar(){
    return (
        <div className="w-full rounded-lg gap-6  border bg-white drop-shadow-lg  p-4">
            <p className="text-md text-center">
                Medical Reports
            </p>
            <div className="flex flex-col gap-2 ">
                <div className="w-1/3 border">
                    dfsdf
                </div>


             {/*   <div
                    ref={containerRef}
                    className=" flex h-[134px] gap-3 flex-wrap flex-row overflow-x-hidden no-scrollbar"
                >
                    {medicalRecords.map((report, index) => (
                        <a
                            key={index}
                            href={
                                import.meta.env.VITE_BLOB_URL +
                                `clinic${currentClinic.clinic._id}/patient/` +
                                report.blobName
                            }
                        >
                            <div
                                data-tooltip-id={`tooltip-${index}`}
                                className="w-[95px] h-[33px] rounded bg-[#F7F7F7] text-[13px] font-normal cursor-pointer flex-shrink-0"
                            >
                                <div className="flex justify-center align-middle mt-2 pt-2">
                                        <span
                                            className="text-[13px] mr-2 text-center icon-[streamline--checkup-medical-report-clipboard]"></span>
                                    <p>{report.fileName.substring(0, 6) + "..."}</p>
                                </div>

                                 <p className="text-[#868686] text-start ms-2">{report.date}</p>
                            </div>
                            <Tooltip id={`tooltip-${index}`} content={report.fileName}>
                                <div className="w-[150px]">
                                    <p>{report.fileName}</p>
                                </div>
                            </Tooltip>
                        </a>
                    ))}
                </div>*/}
            </div>
        </div>
    )
}