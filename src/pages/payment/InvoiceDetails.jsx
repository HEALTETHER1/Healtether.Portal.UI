import PropTypes from "prop-types";

import {
  ParseDecimal,
  CalculateAmountAfterDisc,
} from "../../utils/CommonMethods";
import IndianRupeeSymbol from "../../components/detail-page/IndianRupeeSymbol";
import ContainerHeading from "components/detail-page/ContainerHeading";
import { useRef } from "react";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";

export default function InvoiceDetails({
  invoice,
  onClickPayByCash,
  showAddItem,
  showPayByCash,
}) {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div className="flex flex-col w-[60%] bg-BgDetailPage text-md  rounded-xl text-TextPrimary p-4 shadow-md overflow-y-scroll h-full">
      <div className="flex flex-row justify-between align-center">
        <ContainerHeading heading={"RECEIPT"} />
        <div
          className="text-Secondary cursor-pointer"
          title="Print Receipt"
          onClick={() => handlePrint(null, () => contentToPrint.current)}
        >
          <span className="icon-[streamline--printer-solid] text-xl"></span>
        </div>
      </div>
      <div className="m-6" ref={contentToPrint}>
        <div className="flex justify-between">
          <div>
            Invoice :<span className=""> #{invoice?.invoiceNumber}</span>
          </div>
          <div>{format(new Date(invoice?.created?.on), "dd MMMM, yy")}</div>
        </div>
        <div className=" mt-2 mb-2">
          Patient :{" "}
          <span className="text-Secondary">
            {invoice?.patient?.firstName} {invoice?.patient?.lastName} (#
            {invoice?.patient.patientId})
          </span>
        </div>
        <div className="border border-t-px border-t-TextBgPrimary mb-2"></div>
        <div className="grid grid-cols-7 gap-2 text-md font-normal">
          <div className="text-left font-semibold">Treatments</div>
          <div></div>
          <div></div>
          <div className="text-center font-semibold">Qty</div>
          <div className="text-center font-semibold">Amt.</div>
          <div className="text-center font-semibold">Disc(%)</div>
          <div className="text-right font-semibold">Total</div>
          {invoice.treatments != undefined ? (
            invoice.treatments.map((item, index) => (
              <div key={index} className="contents">
                <div className="text-left col-span-3">{item.treatment}</div>
                <div className="text-center"> {item.quantity} </div>
                <div className="text-center">
                  {ParseDecimal(item.amount)}
                  <IndianRupeeSymbol />
                </div>
                <div className="text-center">{ParseDecimal(item.discRate)}</div>
                <div className="text-right">
                  {CalculateAmountAfterDisc(
                    item.quantity,
                    ParseDecimal(item.amount),
                    ParseDecimal(item.discRate)
                  )}
                  <IndianRupeeSymbol />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm border-b  border-t my-2 py-2 ">
          <div className="col text-start">Total Amount.</div>
          <div className="col text-center">-</div>
          <div className="col text-end">
            {ParseDecimal(invoice.totalAmount)}
            &nbsp; <IndianRupeeSymbol />
          </div>
          <div className="col text-start">Total Tax</div>
          <div className="col text-center">-</div>
          <div className="col text-end">
            {ParseDecimal(invoice.totalTax)}
            &nbsp; <IndianRupeeSymbol />
          </div>
          <div className="col text-start">
            Overall Discount ({invoice.discountRate}%)
          </div>
          <div className="col text-center">-</div>
          <div className="col text-end">
            {ParseDecimal(invoice.discount)}
            &nbsp; <IndianRupeeSymbol />
          </div>
          <div className="col text-start">Total Cost</div>
          <div className="col text-center">-</div>
          <div className="col text-end">
            {ParseDecimal(invoice.totalCost)}
            &nbsp;
            <IndianRupeeSymbol />
          </div>

          <div className="border border-t-px border-t-TextBgPrimary col-span-3"></div>
          <div className="text-start text-Secondary font-medium text-md">
            Grand Total
          </div>
          <div className="text-center  text-Secondary">-</div>
          <div className="text-end  text-Secondary  font-medium text-md">
            {ParseDecimal(invoice.totalCost)}
            &nbsp;
            <IndianRupeeSymbol />
          </div>
          {ParseDecimal(invoice.paidAmount) > 0 ? (
            <>
              <div className="col text-start">Amount Received</div>
              <div className="col text-center">-</div>
              <div className="col text-end">
                {ParseDecimal(invoice.paidAmount)}
                &nbsp;
                <IndianRupeeSymbol />
              </div>
              <div className="col text-start text-Secondary  font-medium text-md">
                Balance Amount
              </div>
              <div className="col text-center">-</div>
              <div className="col text-end text-Secondary  font-medium text-md">
                {ParseDecimal(invoice.totalCost) -
                  ParseDecimal(invoice.paidAmount)}
                &nbsp;
                <IndianRupeeSymbol />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className={`${!showPayByCash ? "hidden" : ""}` + " flex  mt-4"}>
        <button
          type="button"
          className="bg-Primary text-white font-medium w-1/2 ml-[2%] h-10 rounded-md shadow-md"
          onClick={() => {
            onClickPayByCash();
          }}
        >
          Pay by Cash
        </button>
        <button
          type="button"
          className="bg-Primary text-white font-medium w-1/2 ml-[2%] h-10 rounded-md shadow-md"
        >
          <span className="flex items-center justify-center ">
            {" "}
            Send Payment Link &nbsp;
            <span className="icon-[ic--twotone-whatsapp] text-lg"></span>
          </span>
        </button>
      </div>

      <div
        className={
          `${!showAddItem ? "hidden" : ""}` +
          " flex w-full items-center justify-center mt-4"
        }
      >
        <div>
          <button
            type="button"
            className="text-Primary border-Primary font-medium  border-b"
            onClick={() => {
              onClickPayByCash();
            }}
          >
            Add items in receipt
          </button>
        </div>
      </div>
    </div>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.shape({
    invoiceNumber: PropTypes.string,
    created: PropTypes.shape({
      on: PropTypes.string,
    }),
    patient: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      patientId: PropTypes.string,
    }),
    treatments: PropTypes.arrayOf(
      PropTypes.shape({
        treatment: PropTypes.string,
        quantity: PropTypes.number,
        amount: PropTypes.number,
        discRate: PropTypes.number,
      })
    ),
    totalAmount: PropTypes.number,
    totalTax: PropTypes.number,
    discountRate: PropTypes.number,
    discount: PropTypes.number,
    totalCost: PropTypes.number,
    paidAmount: PropTypes.number,
  }),
  onClickPayByCash: PropTypes.func,
  showAddItem: PropTypes.bool,
  showPayByCash: PropTypes.bool,
};
