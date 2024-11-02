import { QueryClient, QueryClientProvider } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import Table from "components/grid/Table";
import { GetClientOverview } from "services/client/client";
import { NamePill } from "components/grid/NamePill";
import { confirm } from "components/dialog/prompt";
import Action from "components/grid/Action";
function ClinicOverview() {
  const navigation = useNavigate();
  const queryClient = new QueryClient();

  function EditClient(e, clinic) {
    navigation("/clinic/editclinic/" + clinic._id);
    e.stopPropagation();
  }

  function DeleteStaffInGrid(e, clinic) {
    confirm({
      show: true,
      title: "Remove",
      proceed: async () => {
        var removed = await DeleteClient(clinic._id);
        return removed;
      },
      confirmation:
        "Are you sure want to remove clinic: " + clinic.clinicName + " ?",
    });
    e.stopPropagation();
  }
  const columns = [
    {
      Header: "Clinic Name",
      accessor: "clinicName",
    },
    {
      Header: "Admin Name",
      Cell: NamePill,
      nameAccessor: (value) => {
        let name = "";
        if (value.adminUserId?.firstName != undefined)
          name += value.adminUserId?.firstName + " ";

        if (value.adminUserId?.lastName != undefined)
          name += value.adminUserId?.lastName;

        return name;
      },
      idAccessor: "_id",
    },
    {
      Header: "Admin Mobile",
      accessor: "adminUserId.mobile",
    },
    {
      Header: "Admin Email",
      accessor: "adminUserId.email",
    },
    {
      Header: "Action",
      Cell: Action,
      actionAccessor: [
        {
          name: "Edit Clinic",
          iconClass: "icon-[fa-regular--edit] text-md",
          callBack: EditClient,
        },
        {
          name: "Delete Clinic",
          iconClass: "icon-[mdi--delete] text-xl",
          callBack: DeleteStaffInGrid,
        },
      ],
      idAccessor: "_id",
    },
  ];
  const fetchClientData = async (
    page,
    pageSize,
    pageFilter,
    pageSortBy,
    setData
  ) => {
    let paramStr = "";
    if (pageFilter?.text?.trim().length > 1 && pageFilter?.text!="ClearAllFilter") {
      paramStr = `&keyword=${pageFilter.text}`;
    }
    if (pageSortBy.length > 0) {
      const sortParams = pageSortBy[0];
      const sortyByDir = sortParams.desc ? "desc" : "asc";
      paramStr = `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`;
    }
    try {
      var res = await GetClientOverview(page, pageSize, paramStr);
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
  return (
    <div className="flex flex-col mt-2">
      <NavLink
        to={"/clinic/addclinic"}
        className="text-white bg-Primary font-normal  w-fit px-5 rounded-lg text-center py-2 ml-1 justify-self-end"
      >
        Add New Clinic
      </NavLink>
      <div className="mt-4">
        <QueryClientProvider client={queryClient}>
          <Table
            headerColumn={columns}
            serverCall={fetchClientData}
            showRow={5}
            tableCaption={"Clinics Overview"}
          />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default ClinicOverview;
