import Layout from "layout/main/Layout.jsx";
import ActionPropType from "utils/ActionPropType.js";
import ErrorPage from "components/error-page/ErrorPage.jsx";
import Appointments from "pages/appointment/Appointments.jsx";
import { Dashboard } from "pages/home/Dashboard.jsx";
import ScheduleAppointment, {
  AppointmentAction,
} from "pages/appointment/ScheduleAppointment.jsx";

import PatientsOverview from "pages/patient/PatientsOverview.jsx";
import ViewPatient from "pages/patient/ViewPatient.jsx";
import ChatOverview from "pages/Chat/ChatOverview.jsx";
import Analytics from "pages/analytics/Analytics.jsx";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "pages/login/Login.jsx";
import StaffsOverview from "pages/staff/StaffsOverview.jsx";
import PageLoader from "layout/loader/PageLoader.jsx";
import Notification from "pages/Notification/Notification.jsx";
import Welcome from "pages/login/Welcome.jsx";
import PaymentOverview from "pages/payment/PaymentOverview.jsx";
import ClinicEdit from "pages/clinic/ClinicEdit.jsx";
import ClinicOverview from "pages/clinic/ClinicOverview.jsx";
import { ClinicAction } from "pages/clinic/ClinicEdit.jsx";
import { RouterProvider } from "react-router-dom";
import EditStaff from "pages/staff/EditStaff";
import EditPatient from "pages/patient/EditPatient";
import Consultation from "pages/patient/Consultation";
import { StaffAction, StaffLoader } from "pages/staff/EditStaff";
import { useSelector } from "react-redux";
import CheckJWT from "utils/CheckJWT";
import ViewStaff from "pages/staff/ViewStaff";
import { PatientAction, PatientLoader } from "./pages/patient/EditPatient";
import { ClinicLoader } from "pages/clinic/ClinicEdit";
import { LoginAction } from "pages/login/Login";
import { SetHeaderToken } from "./services/axios/axios";
import { EditAppointmentLoader } from "./pages/appointment/ScheduleAppointment";
import PaymentDetails, {
  PaymentAction,
  PaymentLoader,
} from "./pages/payment/PaymentDetails";
import Settings, {
  SettingAction,
  SettingLoader,
} from "pages/clinic/settingsPage";
import FollowUpAndCancel from "pages/appointment/FollowUpAndCancel";
import { LoadAppointmentDetail } from "./pages/appointment/FollowUpAndCancel";
import { onMessage } from "firebase/messaging";
import { notificationMessaging } from "./google-firebase/firebaseConfig";
import ScheduleSuccessfully from "./pages/appointment/ScheduleSuccessfully";
import ViewAppointmentAndPatient, {
  EditAppointmentConsultationLoader,
} from "./pages/appointment/ViewAppointmentAndPatient";
import { PatientWithAppointmentDetailLoader } from "./pages/patient/ViewPatient";
import WritePrescription, {
  PrescriptionAction,
} from "pages/writePrescription/WritePrescription.jsx";
import { PrescriptionLoader } from "./pages/writePrescription/WritePrescription";
import WritePrescriptionForStaff from "./pages/writePrescription/WritePrescriptionForStaff";
import {PrescriptionReport} from "components/PrescriptionTemplate.jsx";
import { RedirectPhonePay } from "./pages/payment/RedirectPhonepay";

export function PrivateRoute(props) {
  let { component: Component } = props;
  let extraValidation = true;
  let { checkIsDoctor } = props;
  let { checkIsAdmin } = props;
  let { checkIsAdminOrDoctor } = props;
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  var { clinic } = useSelector((state) => state.currentClinic);
  const isLoggedIn = token != null && token != undefined && !CheckJWT(token);

  if (token != null) {
    SetHeaderToken(token);
  }
  if (checkIsDoctor) {
    extraValidation = user.isDoctor;
  }
  if (extraValidation && checkIsAdmin) {
    extraValidation = user.isAdmin;
  }
  if (extraValidation && checkIsAdminOrDoctor) {
    extraValidation = user.isDoctor || user.isAdmin;
  }
  return isLoggedIn && (clinic == null || clinic?._id == null) ? (
    <Navigate to="/select-clinic" />
  ) : isLoggedIn && extraValidation ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
      handle: {
        crumb: {
          actionButton: new ActionPropType(
            "addpatient",
            "Add New Patient",
            () => {}
          ),
          breadcrumb: [new ActionPropType("dashboard", "Dashboard", () => {})],
        },
      },
      action: LoginAction,
    },
    {
      path: "/linktopayments",
      element: <RedirectPhonePay />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/select-clinic",
      element: <Welcome />,
      handle: {
        crumb: {
          actionButton: new ActionPropType(
            "addpatient",
            "Add New Patient",
            () => {}
          ),
          breadcrumb: [new ActionPropType("dashboard", "Dashboard", () => {})],
        },
      },
    },
    {
      path: "/",
      element: <PrivateRoute component={Layout} />,
      errorElement: <ErrorPage />,
      handle: {
        crumb: {
          actionButton: new ActionPropType(
            "addpatient",
            "Add New Patient",
            () => {}
          ),
          breadcrumb: [new ActionPropType("dashboard", "Dashboard", () => {})],
        },
      },

      children: [
        {
          path: "dashboard",
          element: <PrivateRoute component={Dashboard} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
              ],
            },
          },
        },
        {
          path: "appointment",
          element: <PrivateRoute component={Appointments} />,
          handle: {
            crumb: {
              actionButton: null,
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Appointments", () => {}),
              ],
            },
          },
        },
        {
          path: "appointment/:id/success",
          element: <PrivateRoute component={ScheduleSuccessfully} />,
          handle: {
            crumb: {
              actionButton: null,
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appoinments", () => {}),
                new ActionPropType("noroute", "Schedule Appoinments", () => {}),
              ],
            },
          },
          // action: AppointmentAction,
          loader: EditAppointmentLoader,
        },
        {
          path: "appointment/:id/edit",
          element: <PrivateRoute component={ScheduleAppointment} />,
          handle: {
            crumb: {
              actionButton: null,
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appoinments", () => {}),
                new ActionPropType("noroute", "Schedule Appoinments", () => {}),
              ],
            },
          },
          action: AppointmentAction,
          loader: EditAppointmentLoader,
        },
        {
          path: "appointment/:id/consultation",
          element: <PrivateRoute component={ViewAppointmentAndPatient} />,
          handle: {
            crumb: {
              actionButton: null,
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appoinments", () => {}),
                new ActionPropType("noroute", "Appoinment Details", () => {}),
              ],
            },
          },
          // action: AppointmentAction,
          loader: EditAppointmentConsultationLoader,
        },
        {
          path: "patient/:id/appointment/:appointmentid/details",
          element: <PrivateRoute component={FollowUpAndCancel} />,
          handle: {
            crumb: {
              actionButton: null,
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appoinments", () => {}),
                new ActionPropType("noroute", "Appoinment Details", () => {}),
              ],
            },
          },
          // action: AppointmentAction,
          loader: LoadAppointmentDetail,
        },
        {
          path: "scheduleappointment",
          element: <PrivateRoute component={ScheduleAppointment} />,
          handle: {
            crumb: {
              actionButton: null,
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appoinments", () => {}),
                new ActionPropType("noroute", "Schedule Appoinments", () => {}),
              ],
            },
          },
          action: AppointmentAction,
          loader: EditAppointmentLoader,
        },
        {
          path: "patient/addpatient",
          element: <PrivateRoute component={EditPatient} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "patient/managepatient",
                  "Patient Records",
                  () => {}
                ),
                new ActionPropType("noroute", "Add Patient", () => {}),
              ],
            },
          },
          action: PatientAction,
          loader: PatientLoader,
        },
        {
          path: "patient/viewpatient/:id",
          element: <PrivateRoute component={ViewPatient} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "patient/managepatient",
                  "Patient Records",
                  () => {}
                ),
                new ActionPropType("noroute", "View Patient", () => {}),
              ],
            },
          },
          loader: PatientWithAppointmentDetailLoader,
          //action: patientAction,// loader: patientLoader
        },
        {
          path: "patient/viewpatient/:id/consultation",
          element: <PrivateRoute component={Consultation} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "patient/managepatient",
                  "Patient Records",
                  () => {}
                ),
                new ActionPropType("noroute", "View Patient", () => {}),
              ],
            },
          },
          loader: PatientLoader,
          action: PatientAction,
        },
        {
          path: "patient/viewpatient/:id/edit",
          element: <PrivateRoute component={EditPatient} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "patient/managepatient",
                  "Patient Records",
                  () => {}
                ),
                new ActionPropType("noroute", "View Patient", () => {}),
              ],
            },
          },
          loader: PatientLoader,
          action: PatientAction,
        },
        {
          path: "patient/managepatient",
          element: <PrivateRoute component={PatientsOverview} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Patient Records", () => {}),
              ],
            },
          },
        },
        {
          path: "patient/viewpatient/:id",
          element: <PrivateRoute component={ViewPatient} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "patient/managepatient",
                  "Patient Records",
                  () => {}
                ),
                new ActionPropType("noroute", "Patient Details", () => {}),
              ],
            },
          },
          loader: PatientLoader,
        },
        {
          path: "chats",
          element: <PrivateRoute component={ChatOverview} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Manage Patient", () => {}),
              ],
            },
          },
        },
        {
          path: "staff/managestaffs",
          element: <PrivateRoute component={StaffsOverview} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Staff Details", () => {}),
              ],
            },
          },
        },
        {
          path: "staff/addmember",
          element: <PrivateRoute component={EditStaff} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "staff/managestaffs",
                  "Staff Details",
                  () => {}
                ),
                new ActionPropType("noroute", "Add Member", () => {}),
              ],
            },
          },
          action: StaffAction,
          loader: StaffLoader,
        },
        {
          path: "staff/viewmember/:id",
          element: <PrivateRoute component={ViewStaff} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addstaff",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "staff/managestaffs",
                  "Staff Details",
                  () => {}
                ),
                new ActionPropType("noroute", "Member Detail", () => {}),
              ],
            },
          },
          loader: StaffLoader,
          action: StaffAction, // loader: staffLoader
        },
        {
          path: "staff/viewmember/:id/edit",
          element: <PrivateRoute component={EditStaff} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addstaff",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "staff/managestaffs",
                  "Staff Details",
                  () => {}
                ),
                new ActionPropType("noroute", "Member Detail", () => {}),
              ],
            },
          },
          loader: StaffLoader,
          action: StaffAction, // loader: staffLoader
        },

        {
          path: "analytics",
          element: <PrivateRoute component={Analytics} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Analytics", () => {}),
              ],
            },
          },
        },
        {
          path: "payments",
          element: <PrivateRoute component={PaymentOverview} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Payments Overview", () => {}),
              ],
            },
          },
        },
        {
          path: "payments/:id/manage",
          element: <PrivateRoute component={PaymentDetails} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("payments", "Payments Overview", () => {}),
                new ActionPropType("noroute", "Proceed to Payments", () => {}),
              ],
            },
          },
          action: PaymentAction,
          loader: PaymentLoader,
        },
        {
          path: "notification",
          element: <PrivateRoute component={Notification} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Notifications", () => {}),
              ],
            },
          },
        },

        {
          path: "clinic/manageclinic",
          element: <PrivateRoute component={ClinicOverview} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Manage Clinic", () => {}),
              ],
            },
          },
        },
        {
          path: "clinic/addclinic",
          element: <PrivateRoute component={ClinicEdit} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "clinic/manageclinic",
                  "Manage Clinic",
                  () => {}
                ),
                new ActionPropType("noroute", "Add Clinic", () => {}),
              ],
            },
          },
          action: ClinicAction,
          loader: ClinicLoader,
        },
        {
          path: "clinic/editclinic/:id",
          element: <PrivateRoute component={ClinicEdit} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "clinic/manageclinic",
                  "Manage Clinic",
                  () => {}
                ),
                new ActionPropType("noroute", "Edit Clinic", () => {}),
              ],
            },
          },
          action: ClinicAction,
          loader: ClinicLoader,
        },
        {
          path: "clinic/setting",
          element: <PrivateRoute component={Settings} />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType(
                  "clinic/manageclinic",
                  "Manage Clinic",
                  () => {}
                ),
                new ActionPropType("noroute", "Settings", () => {}),
              ],
            },
          },
          action: SettingAction,
          loader: SettingLoader,
        },
        {
          path: "clinic-detail",
          element: <PrivateRoute component={ClinicOverview} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Notifications", () => {}),
              ],
            },
          },
        },
        {
          path: "appointment/:appointmentId/:patientId/writeprescription",
          element: (
            <PrivateRoute
              component={WritePrescription}
              checkIsAdminOrDoctor={true}
            />
          ),
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appointments", () => {}),
                new ActionPropType("noroute", "Prescription", () => {}),
              ],
            },
          },
          action: PrescriptionAction,
          loader: PrescriptionLoader,
        },
        {
          path: "appointment/:appointmentId/:patientId/vitals",
          element: <PrivateRoute component={WritePrescription} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appointments", () => {}),
                new ActionPropType("noroute", "Prescription", () => {}),
              ],
            },
          },
          action: PrescriptionAction,
          loader: PrescriptionLoader,
        },
        {
          path: "appointment/:appointmentId/:patientId/medicalhistory",
          element: <PrivateRoute component={WritePrescription} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appointments", () => {}),
                new ActionPropType("noroute", "Prescription", () => {}),
              ],
            },
          },
          action: PrescriptionAction,
          loader: PrescriptionLoader,
        },
        {
          path: "appointment/:appointmentId/:patientId/vitalsforstaffs",
          element: <PrivateRoute component={WritePrescriptionForStaff} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appointments", () => {}),
                new ActionPropType("noroute", "Prescription", () => {}),
              ],
            },
          },
          action: PrescriptionAction,
          loader: PrescriptionLoader,
        },
        {
          path: "appointment/:appointmentId/:patientId/medicalhistoryforstaffs",
          element: <PrivateRoute component={WritePrescriptionForStaff} />,
          handle: {
            crumb: {
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("appointment", "Appointments", () => {}),
                new ActionPropType("noroute", "Prescription", () => {}),
              ],
            },
          },
          action: PrescriptionAction,
          loader: PrescriptionLoader,
        },
      ],
    },
    {
      path: "/reportTemplate/:appointmentId/:patientId",
      element: <PrivateRoute component={PrescriptionReport} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
