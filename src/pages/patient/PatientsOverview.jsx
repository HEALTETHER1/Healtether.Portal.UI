import { GetPatientOverview, DeletePatient } from "services/patient/patient";
import { NavLink, useNavigate } from "react-router-dom";
import Action from "components/grid/Action";
import Table from "components/grid/Table";
import { confirm } from "components/dialog/prompt";
import { QueryClient, QueryClientProvider } from "react-query";
import { NamePill } from "components/grid/NamePill";

export default function PatientsOverview() {
  const navigation = useNavigate();
  function EditPatient(e, patient) {
    navigation("/patient/viewpatient/" + patient._id + "/edit");
    e.stopPropagation();
  }

  function DeletePatientInGrid(e, patient) {
    confirm({
      show: true,
      title: "Remove",
      proceed: async () => {
        var removed = await DeletePatient(patient._id);
        return removed;
      },
      confirmation:
        "Are you sure want to remove patient: " +
        patient.firstName +
        " " +
        patient.lastName +
        " ?",
    });
    e.stopPropagation();
  }
  const columns = [
    {
      Header: "ID",
      accessor: "patientId",
    },
    {
      Header: "Name",
      Cell: NamePill,
      nameAccessor: (value) => {
        let name = "";
        if (value.firstName != undefined) name += value.firstName + " ";

        if (value.lastName != undefined) name += value.lastName;

        return name;
      },
      idAccessor: "_id",
    },
    {
      Header: "Contact",
      accessor: "mobile",
    },
    {
      Header: "Last Visited",
      accessor: "appointments.appointmentDate",
    },
    {
      Header: "Last Attended Doctor",
      accessor: "appointments.doctor",
    },
    {
      Header: "Payment",
      accessor: "appointments.paymentStatus",
    },
    {
      Header: "Action",
      Cell: Action,
      actionAccessor: [
        {
          name: "Edit Patient",
          iconClass: "icon-[fa-regular--edit] text-md",
          callBack: EditPatient,
        },
        {
          name: "Whatsapp",
          iconClass: "icon-[ion--logo-whatsapp] text-xl",
          callBack: () => {},
        },
        {
          name: "Delete Patient",
          iconClass: "icon-[mdi--delete] text-xl",
          callBack: DeletePatientInGrid,
        },
      ],
      idAccessor: "_id",
    },
  ];
  const fetchPatientsData = async (page, pageSize, pageFilter, pageSortBy) => {
    let paramStr = "";
    if (
      pageFilter?.text?.trim().length > 1 &&
      pageFilter?.text != "ClearAllFilter"
    ) {
      paramStr = `&keyword=${pageFilter.text}`;
    }
    if (pageSortBy.length > 0) {
      const sortParams = pageSortBy[0];
      const sortyByDir = sortParams.desc ? "desc" : "asc";
      paramStr += `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`;
    }
    try {
      var res = await GetPatientOverview(page, pageSize, paramStr);
      const results = res.data;
      const data = {
        results: results.data,
        count: results.totalCount,
      };
      return data;
    } catch (e) {
      throw new Error(`API error:${e?.message}`);
    }
  };
  const queryClient = new QueryClient();
  const rowClick = (row) => {
    navigation("/patient/viewpatient/" + row._id);
  };
  return (
    <div className="flex flex-col mt-2">
      <NavLink
        to={"/patient/addpatient"}
        className="text-white bg-Primary font-normal  w-fit px-5 rounded-lg text-center py-2 ml-1 justify-self-end"
      >
        Add New Patient
      </NavLink>
      <div className="mt-4">
        <QueryClientProvider client={queryClient}>
          <Table
            headerColumn={columns}
            rowClick={rowClick}
            serverCall={fetchPatientsData}
            tableCaption={"Patient Records"}
            showRow={5}
          />
        </QueryClientProvider>
      </div>
    </div>
  );
}
