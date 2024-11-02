import ContainerHeading from "components/detail-page/ContainerHeading"
import {useRef, useState} from "react";
import { useNavigation } from "react-router-dom";
import DefaultTextboxClass from 'utils/Classes';
import {DOCUMENT_OPTIONS_LIST} from "utils/OptionList";
import Spinner from "../loader/Spinner";

function Documents({documentType,documentNo,documentNames,blob_url,click}) {
    const docUploadRef = useRef(null);
    const navigation = useNavigation();
    const busy = navigation.state === "submitting";
    let docnames=[];
    for(var i=0;!!documentNames && i<documentNames.length;i++){
        docnames[i]={name:documentNames[i]}; 
    }
    const [docUploadName,
        setDocUploadName] = useState(docnames);
    //const [documentNames,setDocumentNames]=useState(documentNames);
    function uploadDocumentClicked() {
        docUploadRef
            .current
            .click()
    }
    function docUploadUpdate(e) {
        //setOtherDocumentValue(e.target.files)
        var accept = "application/docx,application/pdf,image/png,image/jpeg";
        
            let docnames = [...docUploadName];

            if (e.target.files.length == 0) 
                return false;
            
            for (var i = 0; i < e.target.files.length; i++) {
              if (accept.indexOf(e.target.files[i].type) > 0) {
                docnames.push(e.target.files[i]);
                }
                else{
                    alert("File is not accepted.");
                    return false;
                }
            }
            setDocUploadName(docnames)
     }
    
    let documentSelectHtml = [];
    DOCUMENT_OPTIONS_LIST.forEach((item,i) => {
        documentSelectHtml.push(
            <option key={i+1} value={item["Documents"]}>{item["Documents"]}</option>
        );
    });
    function docUploadRemove(e,index) {
        e.preventDefault();
        let docnames = [...docUploadName];
        docnames.splice(index,1);
        setDocUploadName(docnames);
    }
   
    return (
        <div className="h-full">
            <div className="flex flex-col space-y-3 h-3/4">
                <ContainerHeading heading={"Documents"}/>
                <div className="flex space-x-2">
                    <div className='w-1/2 space-y-1'>
                        <label className="text-sm ">ID Proof
                        </label>
                        <select
                            id="documentType"
                            name="documentType"
                            placeholder="ID Proof"
                            defaultValue={documentType}
                            className={DefaultTextboxClass + " w-full text-md"}>
                            <option value=""></option>
                            {documentSelectHtml}
                        </select>

                    </div>
                    <div className='w-1/2 space-y-1'>
                        <label className="text-sm ">ID no.
                        </label>
                        <input
                            type="text"
                            name="documentNumber"
                            placeholder="ID no."
                            autoComplete="off"
                            defaultValue={documentNo}
                            className={DefaultTextboxClass + " w-full text-md"}/>
                    </div>
                </div>
                <div className="text-Primary font-light text-sm">
                    You can also upload documents in png, jpg, docx, & pdf formats.
                </div>
                <div className="w-full">
                    <button
                        type="button"
                        className="bg-[#A1A1A1] text-white mt-2 px-15 py-3 flex justify-between font-normal text-sm items-center p-3 rounded-md"
                        onClick={uploadDocumentClicked}>Upload documents &nbsp;
                        <i className="icon-[bytesize--upload] text-4xl "></i>
                    </button>
                    <input
                        id="otherDocument"
                        name="documents"
                        type="file"
                        onChange={docUploadUpdate}
                        className="hidden"
                        multiple
                        accept="application/docx,application/pdf,image/png,image/jpeg"
                        ref={docUploadRef}/>
                         <input type="hidden" className="hidden" name="documentNames" value={JSON.stringify(documentNames)} />
                  
                </div>
                <div className="text-Secondary font-normal text-xs">
                    Please upload image/document of size less than 50Mb.
                </div>
                <div className="flex mb-4">
                    <button
                        type="submit"
                        disabled={busy}
                        className="bg-Primary text-white py-3 px-14 h-fit rounded-md">
                            Save &nbsp; {busy? <Spinner show={true}/>:<></>} </button>
                </div>
            </div>

            <div className="bg-BgPrimary flex flex-col rounded-3xl mt-4 h-fit p-6 h-1/4">
                <ContainerHeading heading={"List"}/> {docUploadName == false
                    ? <div className="font-light text-sm">no document.</div>
                    : docUploadName.map((e, index) => {
                        return (
                            <div
                                key={index + 1}
                                className="font-normal text-sm flex justify-between pt-2 items-center border-b-2">
                                <p className="text-gray-500">{(index + 1) + ". " + (e.name.fileName!=null?e.name.fileName:e.name) }</p>
                                <div>
                                     <a href={blob_url+e.name.blobName} target="_blank" className="cursor-pointer"> 
                                     <i className="icon-[mdi--file-find] text-xl "></i>
                                     </a>
                                     <i
                                        className="icon-[mdi--trash] text-xl cursor-pointer text-red-800"
                                        onClick={(e) => {
                                        docUploadRemove(e,index);
                                    }}></i>
                                </div>

                            </div>
                        )
                    })}

            </div>
        </div>
    )
}

export default Documents