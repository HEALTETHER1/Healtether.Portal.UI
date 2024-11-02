import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import VitalDetail from "components/detail-page/vitals/VitalDetail.jsx";
import VitalsSidebar from "components/detail-page/write-prescription/SiderBar/VitalsSidebar.jsx";
import PastHistorySidebar from "components/detail-page/write-prescription/SiderBar/PastHistorySidebar.jsx";
import MedicalReportSidebar from "components/detail-page/write-prescription/SiderBar/MedicalReportSidebar.jsx";
/*import {GetAppointmentConsultation} from "../../services/appointment/appointment";*/

function PrescriptionSidebar({isLoading,vitals,medicalHistory}) {
    

    return (
        <>
            <div
                className="flex-col lg:flex md:hidden xs:hidden md:peer-click:flex gap-2 mt-1 "
                id="sideNav"
            >
                <VitalsSidebar loading={isLoading} vitalsObj={vitals} />
                <PastHistorySidebar allergies={medicalHistory?.allergies} medication={medicalHistory?.medication} pastHistory={medicalHistory?.pastHistory} procedure={medicalHistory?.pastProcedureHistory}  />
                <MedicalReportSidebar />
            </div>
        </>
    );
}

export default PrescriptionSidebar;

PrescriptionSidebar.propTypes= {
    isLoading: PropTypes.bool,
    vitals:PropTypes.object,
    medicalHistory:PropTypes.object
}

