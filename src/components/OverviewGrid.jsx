import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GetStaffOverview } from "services/staff/staff";
import { GetPatientOverview } from "services/patient/patient";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { GetAppointmentOverview } from "services/appointment/appointment";

export function OverviewGrid({ grid, data }) {
  const [loaded, setLoaded] = useState(true);
  const [overviewData, setOverviewData] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    setLoaded(false);
    if (!loaded) {
      if (grid === "staff") {
        GetStaffOverview(1, 10).then((data) => {
          let overview = [];
          for (let index = 0; index < data.data.length; index++) {
            const staff = data.data[index];
            overview.push(
              <tr
                className="border-b-8 border-white bg-[#f7f4fa] text-neutral-800"
                key={index}
                onClick={(e) => {
                  navigation("/viewstaff/" + staff._id);
                }}
              >
                <td className="whitespace-nowrap py-4">{staff.name}</td>
                <td className="whitespace-nowrap py-4">{staff.mobile}</td>
                <td className="whitespace-nowrap py-4 content-center ">
                  {staff.isAdmin ? (
                    <span className="bg-gray-300 p-1 w-fit text-sm rounded-md px-2 mb-2 cursor-pointer ">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-gray-300 p-1 w-fit text-sm rounded-md px-2 mb-2 cursor-pointer ">
                      Guest
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap py-4">
                  <span className="flex justify-center gap-4 ">
                    <span
                      className="icon-[mdi--edit-box-outline] text-[26px] cursor-pointer "
                      data-tooltip-id="grid-tooltip"
                      data-tooltip-content="Edit Staff"
                      data-tooltip-place="top"
                    ></span>
                    <span
                      className="icon-[ic--outline-email] text-[26px] cursor-pointer "
                      data-tooltip-id="grid-tooltip"
                      data-tooltip-content="Email"
                      data-tooltip-place="top"
                    ></span>
                    <span
                      className="icon-[ic--round-whatsapp] text-[26px] cursor-pointer "
                      data-tooltip-id="grid-tooltip"
                      data-tooltip-content="Whatsapp"
                      data-tooltip-place="top"
                    ></span>
                    <span
                      className="icon-[mdi--trash] text-[26px] cursor-pointer "
                      data-tooltip-id="grid-tooltip"
                      data-tooltip-content="Delete"
                      data-tooltip-place="top"
                    ></span>
                  </span>
                </td>
              </tr>
            );
          }
          setOverviewData(overview);
        });
      } else if (grid === "patient") {
        GetPatientOverview(1, 10).then((data) => {
          let overview = [];
          for (let index = 0; index < data?.length; index++) {
            const patient = data[index];
            overview.push(
              <tr
                className="border-b-8 border-white bg-[#f7f4fa] text-neutral-800"
                key={index}
              >
                <td className="whitespace-nowrap px-1 py-4">{patient.name}</td>
                <td className="whitespace-nowrap px-1 py-4">
                  {patient.mobile}
                </td>
                <td className="whitespace-nowrap px-1 py-4">
                  {patient.isAdmin}
                </td>
                <td className="whitespace-nowrap px-1 py-4">Secondary</td>
              </tr>
            );
          }
          setOverviewData(overview);
        });
      } else {
        GetAppointmentOverview(1, 10).then((data) => {
          let overview = [];
          for (let index = 0; index < data.data.length; index++) {
            const appointment = data.data[index];
            overview.push(
              <tr
                className="border-b-8 border-white bg-[#f7f4fa] text-neutral-800"
                key={index}
              >
                <td className="whitespace-nowrap px-2 py-4">
                  {appointment.name}
                </td>
                <td className="whitespace-nowrap px-2 py-4">
                  {appointment.mobile}
                </td>
                <td className="whitespace-nowrap px-2 py-4">
                  {appointment.isAdmin}
                </td>
                <td className="whitespace-nowrap px-2 py-4">Secondary</td>
              </tr>
            );
          }
          setOverviewData(overview);
        });
      }
    }
  }, [loaded, grid, navigation]);

  return (
    <div className="flex flex-col">
      <Tooltip id="grid-tooltip" />
      <table className="min-w-full text-center text-md font-light">
        <thead className="border-b-8 border-white bg-[#740ac7] text-white">
          <tr>
            <th scope="col" className="py-2">
              Name
            </th>
            <th scope="col" className="py-2">
              Phone
            </th>
            <th scope="col" className="py-2">
              Status
            </th>
            <th scope="col" className="py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{overviewData}</tbody>
      </table>
    </div>
  );
}

OverviewGrid.propTypes = {
  grid: PropTypes.oneOf(["staff", "patient", "appointment"]).isRequired,
  data: PropTypes.array, // Data might not be used directly, but you might want to include it for completeness
};

export default OverviewGrid;
