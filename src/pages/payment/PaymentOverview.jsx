import { QueryClient, QueryClientProvider } from "react-query";
import { GetPaymentOverview } from "../../services/payment/payment.js";
import Table from "components/grid/Table";
import PatientInfo from "./grid-component/PatientInfo";
import Status from "./grid-component/Status";
import Action from "./grid-component/Action";
import { NamePill } from "components/grid/NamePill";
import { format } from "date-fns";
import BalanceInfo from "./grid-component/BalanceInfo.jsx";
function PaymentOverview() {
  const columns = [
    {
      Header: "Patient Info",
      Cell: PatientInfo,
      idAccessor: "_id",
    },
    {
      Header: "Date",
      Cell: NamePill,
      nameAccessor: (value) => {
        return format(new Date(value.appointmentDate), "dd MMMM, yy");
      },
    },
    {
      Header: "Total Amt",
      accessor: "invoicedetail[0].totalCost.$numberDecimal",
      idAccessor: "_id",
    },
    {
      Header: "Balance Amt",
      Cell: BalanceInfo,
      idAccessor: "_id",
    },
    {
      Header: "Status",
      Cell: Status,
      idAccessor: "_id",
    },
    {
      Header: "Action",
      Cell: Action,
      idAccessor: "_id",

      //    idAccessor:"_id"
    },
  ];
  const fetchUsersData = async (page, pageSize, pageFilter, pageSortBy) => {
    let paramStr = "";
    if (pageFilter.trim().length > 1) {
      paramStr = `&keyword=${pageFilter}`;
    }
    if (pageSortBy.length > 0) {
      const sortParams = pageSortBy[0];
      const sortyByDir = sortParams.desc ? "desc" : "asc";
      paramStr = `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`;
    }
    try {
      var res = await GetPaymentOverview(page + 1, pageSize, paramStr);
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

  return (
    <div>
      <div className="mt-2">
        <QueryClientProvider client={queryClient}>
          <Table
            headerColumn={columns}
            serverCall={fetchUsersData}
            tableCaption={"Payment Status"}
            showRow={5}
          />
        </QueryClientProvider>
      </div>
      {/* <OverviewGrid grid="appointment"/> */}
    </div>
  );
}

export default PaymentOverview;
