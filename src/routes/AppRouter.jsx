import Layout from "layout/main/Layout.jsx";
import ActionPropType from "utils/ActionPropType.js";
import ErrorPage from "components/error-page/ErrorPage.jsx";
import Appointments from "pages/appointment/Appointments.jsx";
import AddPatient, { PatientAction } from "../pages/patient/AddPatient.jsx";
import { Dashboard } from "pages/home/Dashboard.jsx";
import ScheduleAppointment, {
  AppointmentAction,
} from "pages/appointment/ScheduleAppointment.jsx";
import PatientsOverview from "pages/patient/PatientsOverview.jsx";
import ViewPatient, { PatientLoader } from "pages/patient/ViewPatient.jsx";
import ChatOverview from "pages/Chat/ChatOverview.jsx";
import AddStaff, { StaffAction } from "pages/staff/AddStaff.jsx";
import ViewStaff, { StaffLoader } from "pages/staff/ViewStaff.jsx";
import Analytics from "pages/analytics/Analytics.jsx";
import PaymentStatus from "pages/payment/PaymentStatus.jsx";
import { createBrowserRouter } from "react-router-dom";
import Login from "pages/login/Login.jsx";
import { loginAction } from "../pages/AuthForm/LoginForm.jsx";

function AppRouter() {
  return createBrowserRouter([
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
      action: loginAction,
    },
    {
      path: "/",
      element: <Layout />,
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
          element: <Dashboard />,
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
          element: <Appointments />,
          handle: {
            crumb: {
              actionButton: null,
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Appoinments", () => {}),
              ],
            },
          },
        },
        {
          path: "scheduleappointment",
          element: <ScheduleAppointment />,
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
          action: AppointmentAction, // loader: appointmentLoader
        },
        {
          path: "addpatient",
          element: <AddPatient />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("managepatient", "Manage Patient", () => {}),
                new ActionPropType("noroute", "Add Patient", () => {}),
              ],
            },
          },
          action: PatientAction, // loader: patientLoader
        },
        {
          path: "managepatient",
          element: <PatientsOverview />,
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
          path: "viewpatient",
          element: <ViewPatient />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("managepatient", "Manage Patient", () => {}),
                new ActionPropType("noroute", "View Patient", () => {}),
              ],
            },
          },
        },
        {
          path: "chats",
          element: <ChatOverview />,
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
          path: "managestaffs",
          element: <StaffsOverview />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addstaff",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("noroute", "Manage Staffs", () => {}),
              ],
            },
          },
        },
        {
          path: "addstaff",
          element: <AddStaff />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addstaff",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("managestaffs", "Manage Staffs", () => {}),
                new ActionPropType("noroute", "Add Staff", () => {}),
              ],
            },
          },
          action: StaffAction,
          loader: StaffLoader,
        },
        {
          path: "viewstaff/:id",
          element: <ViewStaff />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addstaff",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("managestaffs", "Manage Staffs", () => {}),
                new ActionPropType("noroute", "View Staff", () => {}),
              ],
            },
          },
          loader: StaffLoader,
          //action: staffAction,// loader: staffLoader
        },
        {
          path: "viewstaff/:id/edit",
          element: <AddStaff />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addstaff",
                "Add New Member",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("managestaffs", "Manage Staffs", () => {}),
                new ActionPropType("noroute", "View Staff", () => {}),
              ],
            },
          },
          loader: StaffLoader,
          action: StaffAction, // loader: staffLoader
        },
        {
          path: "viewpatient/:id",
          element: <ViewPatient />,
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
                  "managepatients",
                  "Manage Patients",
                  () => {}
                ),
                new ActionPropType("noroute", "View Patient", () => {}),
              ],
            },
          },
          loader: PatientLoader,
          //action: patientAction,// loader: patientLoader
        },

        {
          path: "viewpatient/:id/edit",
          element: <AddPatient />,
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
                  "managepatients",
                  "Manage Patients",
                  () => {}
                ),
                new ActionPropType("noroute", "View Patient", () => {}),
              ],
            },
          },
          loader: PatientLoader,
          //action: patientAction,// loader: patientLoader
        },
        {
          path: "analytics",
          element: <Analytics />,
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
          element: <PaymentStatus />,
          handle: {
            crumb: {
              actionButton: new ActionPropType(
                "addpatient",
                "Add New Patient",
                () => {}
              ),
              breadcrumb: [
                new ActionPropType("dashboard", "Dashboard", () => {}),
                new ActionPropType("managestaffs", "Payments", () => {}),
              ],
            },
          },
        },
      ],
    },
  ]);
}
export default AppRouter;
