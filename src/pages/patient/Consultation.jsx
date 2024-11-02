import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ContainerHeading from "components/detail-page/ContainerHeading";
import ListFiles from "components/view-page/ListFiles";
import {
  EndConsultation,
  SaveAsDraftApi,
} from "../../services/appointment/appointment";
import { useNavigate } from "react-router-dom";
import { alertBox } from "components/dialog/prompt";

function Consultation({
  appointmentId,
  setEndConsultation,
  consultationRecords,
}) {
  const navigation = useNavigate();
  const endConsultationSubmittedRef = useRef(false);
  const [prescriptionList, setPrescriptionList] = useState(() =>
    consultationRecords?.prescriptionRecords != null
      ? consultationRecords?.prescriptionRecords
      : []
  );
  const [medicalRecordList, setMedicalRecordList] = useState(() =>
    consultationRecords?.medicalRecords != null
      ? consultationRecords?.medicalRecords
      : []
  );
  const [procedureRecordList, setProcedureRecordList] = useState(() =>
    consultationRecords?.procedureRecords != null
      ? consultationRecords?.procedureRecords
      : []
  );
  const [removeRecordList, setRemoveRecordList] = useState(() => []);

  useEffect(() => {
    if (setEndConsultation && !endConsultationSubmittedRef.current) {
      endConsultationSubmittedRef.current = true;
      const submitConsultation = async () => {
        if (
          prescriptionList.length === 0 &&
          medicalRecordList.length === 0 &&
          procedureRecordList.length === 0
        ) {
          alertBox({
            show: true,
            title: "Message",
            proceed: undefined,
            confirmation: "Upload at least one file",
          });
        } else {
          const result = await EndConsultation(
            prescriptionList,
            medicalRecordList,
            procedureRecordList,
            removeRecordList,
            appointmentId
          );
          if (result.status === 200) {
            navigation("/appointment");
          }
        }
      };
      submitConsultation();
    }
  }, [
    setEndConsultation,
    prescriptionList,
    medicalRecordList,
    procedureRecordList,
    removeRecordList,
    appointmentId,
    navigation,
  ]);

  const prescriptionUploadRef = useRef(null);
  const medicalRecordUploadRef = useRef(null);
  const procedureRecordRef = useRef(null);

  const PrescriptionUploadDocumentClicked = () =>
    prescriptionUploadRef.current.click();
  const MedicalRecordUploadDocumentClicked = () =>
    medicalRecordUploadRef.current.click();
  const ProcedureUploadDocumentClicked = () =>
    procedureRecordRef.current.click();

  function ExtractFileFromFileList(fileList, docs) {
    for (let index = 0; index < fileList.length; index++) {
      if (fileList[index] instanceof FileList) {
        for (let j = 0; j < fileList[index].length; j++) {
          docs.push(fileList[index][j]);
        }
      } else {
        docs.push(fileList[index]);
      }
    }
  }

  function PrescriptionUploadUpdate(e) {
    const docs = [...prescriptionList];
    ExtractFileFromFileList(e.target.files, docs);
    setPrescriptionList(docs);
  }

  function MedicalRecordUploadUpdate(e) {
    const docs = [...medicalRecordList];
    ExtractFileFromFileList(e.target.files, docs);
    setMedicalRecordList(docs);
  }

  function ProcedureUploadUpdate(e) {
    const docs = [...procedureRecordList];
    ExtractFileFromFileList(e.target.files, docs);
    setProcedureRecordList(docs);
  }

  function RemovePrescriptionFiles(e, index, fileName, isUploaded = false) {
    let prescriptionDocs = [...prescriptionList];
    const docs = [...removeRecordList];
    if (isUploaded) {
      docs.push(fileName);
    }
    prescriptionDocs.splice(index, 1);
    setPrescriptionList(prescriptionDocs);
    setRemoveRecordList(docs);
  }

  function RemoveMedicalRecordFiles(e, index, fileName, isUploaded = false) {
    let medicalDocs = [...medicalRecordList];
    const docs = [...removeRecordList];
    if (isUploaded) {
      docs.push(fileName);
    }
    medicalDocs.splice(index, 1);
    setMedicalRecordList(medicalDocs);
    setRemoveRecordList(docs);
  }

  function RemoveProcedureFiles(e, index, fileName, isUploaded = false) {
    let procedureDocs = [...procedureRecordList];
    const docs = [...removeRecordList];
    if (isUploaded) {
      docs.push(fileName);
    }
    procedureDocs.splice(index, 1);
    setProcedureRecordList(procedureDocs);
    setRemoveRecordList(docs);
  }

  async function SaveAsDraft() {
    if (
      prescriptionList.length === 0 &&
      medicalRecordList.length === 0 &&
      procedureRecordList.length === 0
    ) {
      alertBox({
        show: true,
        title: "Message",
        proceed: undefined,
        confirmation: "Upload at least one file",
      });
    } else {
      const result = await SaveAsDraftApi(
        prescriptionList,
        medicalRecordList,
        procedureRecordList,
        removeRecordList,
        appointmentId
      );
      if (result.status === 200) {
        navigation("/appointment");
      }
    }
  }

  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="font-light text-sm text-Primary">
        Note: Please upload image/document (<b>.png, .jpg, .docx & .pdf</b>) of
        size
        <b>less than 50Mb</b>
      </div>
      <div className="space-y-2 border-b pb-3">
        <div>
          <ContainerHeading heading={"ADD PRESCRIPTION"} />
        </div>
        <div className="w-full mt-2">
          {prescriptionList?.length > 0 ? (
            <ListFiles
              files={prescriptionList}
              heading={""}
              addFiles={() => PrescriptionUploadDocumentClicked()}
              removeFiles={RemovePrescriptionFiles}
            />
          ) : (
            <button
              type="button"
              className="bg-[#A1A1A1] text-white w-1/3 flex justify-between font-light text-sm items-center p-2 rounded-md"
              onClick={PrescriptionUploadDocumentClicked}
            >
              Browse to upload documents &nbsp;
              <i className="icon-[bytesize--upload] text-4xl "></i>
            </button>
          )}
          <input
            id="PrescriptionDocument"
            name="PrescriptionDocument"
            type="file"
            onChange={PrescriptionUploadUpdate}
            className="hidden"
            multiple
            ref={prescriptionUploadRef}
          />
        </div>
      </div>
      <div className="space-y-2 border-b pb-3 ">
        <ContainerHeading heading={"ADD MEDICAL RECORD"} />
        <div className="w-full mt-2">
          {medicalRecordList?.length > 0 ? (
            <ListFiles
              files={medicalRecordList}
              heading={""}
              removeFiles={RemoveMedicalRecordFiles}
              addFiles={() => MedicalRecordUploadDocumentClicked()}
            />
          ) : (
            <button
              type="button"
              className="bg-[#A1A1A1] text-white w-1/3 flex justify-between font-light text-sm items-center p-2 rounded-md"
              onClick={MedicalRecordUploadDocumentClicked}
            >
              Browse to upload documents &nbsp;
              <i className="icon-[bytesize--upload] text-4xl "></i>
            </button>
          )}
          <input
            id="MedicalRecordDocument"
            name="MedicalRecordDocument"
            type="file"
            onChange={MedicalRecordUploadUpdate}
            className="hidden"
            multiple
            ref={medicalRecordUploadRef}
          />
        </div>
      </div>
      <div className="space-y-2 ">
        <ContainerHeading heading={"ADD Procedure RECORD"} />
        <div className="w-full mt-2">
          {procedureRecordList?.length > 0 ? (
            <ListFiles
              files={procedureRecordList}
              heading={""}
              removeFiles={RemoveProcedureFiles}
              addFiles={() => ProcedureUploadDocumentClicked()}
            />
          ) : (
            <button
              type="button"
              className="bg-[#A1A1A1] text-white w-1/3 flex justify-between font-light text-sm items-center p-2 rounded-md"
              onClick={ProcedureUploadDocumentClicked}
            >
              Browse to upload documents &nbsp;
              <i className="icon-[bytesize--upload] text-4xl "></i>
            </button>
          )}
          <input
            id="ProcedureDocument"
            name="ProcedureDocument"
            type="file"
            onChange={ProcedureUploadUpdate}
            className="hidden"
            multiple
            ref={procedureRecordRef}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="w-1/4 bg-Primary text-white py-4 h-fit rounded-md"
          onClick={() => {
            SaveAsDraft();
          }}
        >
          Draft
        </button>
      </div>
    </div>
  );
}

Consultation.propTypes = {
  appointmentId: PropTypes.string.isRequired,
  setEndConsultation: PropTypes.bool.isRequired,
  consultationRecords: PropTypes.shape({
    prescriptionRecords: PropTypes.array,
    medicalRecords: PropTypes.array,
    procedureRecords: PropTypes.array,
  }).isRequired,
};

export default Consultation;
