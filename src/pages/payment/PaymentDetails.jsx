import { useEffect, useState } from "react";
import InvoiceTreatmentCard from "./InvoiceTreatmentCard";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { AddInvoice, GetInvoiceById } from "../../services/payment/payment";
import InvoiceDetails from "./InvoiceDetails";
import DefaultTextboxClass from "../../utils/Classes";
import PayByCash from "./PayByCash";
import Paid from "./Paid";

export async function PaymentLoader({ params }) {
  var invoice = undefined;
  if (params?.id != undefined) {
    const invoice = await GetInvoiceById(params.id);
    return { invoice };
  }
  return { invoice };
}
export async function PaymentAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      formData.getAll(key).length > 1
        ? formData.getAll(key)
        : formData.get(key),
    ])
  );
  await AddInvoice(params.id, "1", "1", { data: updates });
  return redirect(`/payments/` + params.id + `/manage`);
}
const PaymentDetails = () => {
  const { invoice } = useLoaderData();
  var resetTreatment = false;
  const [onPayByCash, SetOnPayByCash] = useState(false);
  const [paided, SetPaided] = useState(false);
  const [items, setItems] = useState(
    invoice?.data?.treatments != []
      ? invoice.data.treatments
      : [
          {
            treatment: "",
            quantity: "",
            amount: "",
            discRate: "0",
            itemId: 1,
            itemNo: 1,
          },
        ]
  );

  // const [items, setItems] = useState([]); setItems([...items,<CreateItem
  // key='abc' />]) const handleAddItem = () => {     // Call setItems to update
  // the state with the new item     setItems([...items, <CreateItem
  // key={items.length + 1}  itemId="2" itemNo="2" />]);     console.log("Item
  // added"); };
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        treatment: "",
        quantity: "",
        amount: "",
        discRate: "0",
        itemId: items.length + 1,
        itemNo: items.length + 1,
      },
    ]);
  };
  const handleRemoveItem = () => {
    var list = [...items];
    if (list.length > 1) {
      list.pop();
      setItems(list);
    } else {
      // show dialog message;
    }
  };
 

  function HandlePayByCash(value) {
    SetOnPayByCash(value);
  }
  function ShowPaid() {
    SetPaided(!paided);
  }

  return (
    <div className="flex mt-4 space-x-2 h-[94%] text-sm">
      <div
        className={
          `${onPayByCash ? "hidden" : ""}` +
          " flex flex-col  w-[40%] text-TextPrimary px-2  overflow-y-scroll h-full "
        }
      >
        <div className="font-medium w-full">
          MAKE RECEIPT
          <div className="lg:w-15 xs:w-12 h-[2px] bg-BgSecondary"></div>{" "}
        </div>{" "}
        <Form id="paymentcart" method="post" encType="multipart/form-data">
          {" "}
          <div className="text-TextPrimary  my-2 text-xs font-medium">
            Items
          </div>{" "}
          <div className="space-y-4">
            {" "}
            {items.map((i, no) => (
              <InvoiceTreatmentCard
                key={no}
                itemId={i.itemId == undefined ? no + 1 : i.itemId}
                itemNo={i.itemNo == undefined ? no + 1 : i.itemNo}
                amount={i.amount}
                quantity={i.quantity}
                treatment={i.treatment}
                discountRate={i.discRate}
                clear={resetTreatment}
              />
            ))}{" "}
          </div>
          <div className="flex justify-between mt-2">
            <button
              type="button"
              className="text-Secondary font-medium border-b-2 border-b-Secondary"
              onClick={() => {
                handleRemoveItem();
              }}
            >
              - Delete Item
            </button>{" "}
            <button
              type="button"
              className="text-Secondary font-medium border-b-2 border-b-Secondary"
              key="1"
              onClick={() => {
                handleAddItem();
              }}
            >
              + Add Another Item
            </button>{" "}
          </div>
          <div className="flex justify-between items-center my-4">
            <div>Overall Dst. Rate (%)</div>{" "}
            <input
              type="number"
              placeholder="0.0%"
              name="discount"
              id=""
              className={DefaultTextboxClass + " text-right"}
            />{" "}
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              className="bg-white text-Primary border drop-shadow-md border-Primary font-bold w-56 py-2 rounded-md self-end"
            >
              Make Receipt
            </button>{" "}
          </div>
        </Form>
      </div>

      {/* PAYMENTS  */}
      <div
        className={
          `${!onPayByCash || paided ? "hidden" : ""}` +
          " flex flex-col  w-[40%] text-TextPrimary  overflow-y-scroll h-full "
        }
      >
        <PayByCash
          invoice={invoice.data}
          onClickGoBack={() => {
            HandlePayByCash(!onPayByCash);
          }}
          afterMakePayment={() => {
            ShowPaid();
          }}
        />
      </div>
      <div
        className={
          `${!paided ? "hidden" : ""}` +
          " flex flex-col  w-[40%] text-TextPrimary  overflow-y-scroll h-full "
        }
      >
        <Paid
          invoice={invoice.data}
          onClickGoBack={() => {
            HandlePayByCash(!onPayByCash);
          }}
        />
      </div>
      <InvoiceDetails
        invoice={invoice.data}
        onClickPayByCash={() => {
          HandlePayByCash(!onPayByCash);
        }}
        showAddItem={onPayByCash && !paided}
        showPayByCash={!onPayByCash}
      />
    </div>
  );
};
export default PaymentDetails;
