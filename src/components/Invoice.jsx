import React from "react";

const Invoice = ({
  type = "CLAIM",
  invoice,
  claim
}) => {
  if (!invoice) return null;

  const isClaim = type === "CLAIM";

  const items = isClaim
    ? claim?.products || []
    : invoice?.items || [];

  return (
    <div className="flex justify-center pb-5">
      <div className="w-full max-w-[800px] bg-white shadow-2xl border border-slate-100 rounded-lg p-10 pt-5">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img src="/assets/logo.png" className="w-10 rounded-full" />
            <div>
              <h3 className="text-2xl font-black uppercase">Evee</h3>
              <p className="text-[11px] font-bold">
                {isClaim ? "Service Claim Invoice" : "Sale Invoice"}
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Service Center
                </p>
                <p className="text-md font-bold border-b-2 border-[#a3c639] whitespace-nowrap">
                  Johar Town Service Center
                </p>
              </div>

              <img
                src="/assets/QR.png"
                alt="Service Center QR"
                className="w-20 h-20 object-contain border rounded"
              />
            </div>
        </div>

        {/* ===== INFO GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 mb-6">
          <div className="divide-y border-r">
            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                Invoice No
              </div>
              <div className="col-span-2 p-2 font-bold">
                {invoice.id}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                Customer
              </div>
              <div className="col-span-2 p-2">
                {invoice.customerName}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                Motor Number
              </div>
              <div className="col-span-2 p-2">
                {invoice.address}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                Scooter Model
              </div>
              <div className="col-span-2 p-2">
                {invoice.scooterModel}
              </div>
            </div>
          </div>

          <div className="divide-y">
            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                {isClaim ? "Claim Date" : "Sale Date"}
              </div>
              <div className="col-span-2 p-2 italic">
                {isClaim ? claim?.claimDate : invoice.date}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                Purchase Date
              </div>
              <div className="col-span-2 p-2">
                {invoice.regNo}
              </div>
            </div>

            {isClaim && (
              <div className="grid grid-cols-3">
                <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                  Chassis No
                </div>
                <div className="col-span-2 p-2">
                  123456
                </div>
                <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                  Approved
                </div>
                <div className="col-span-2 p-2 font-bold">
                  {claim?.isApproved ? "APPROVED" : "NOT APPROVED"}
                </div>
              </div>

            )}
          </div>
        </div>

        {/* ===== ITEMS TABLE ===== */}
        <div className="border border-gray-300 mb-6">
          <div className="bg-[#446b30] text-white text-xs font-bold p-3 uppercase">
            {isClaim ? "Claimed Items" : "Sold Items"}
          </div>

          <div className="grid grid-cols-4 text-[11px] font-bold bg-gray-100">
            <div className="p-2 border-r">Name</div>
            <div className="p-2 border-r text-center">Qty</div>
            <div className="p-2 border-r text-right">Price</div>
            <div className="p-2 text-right">Total</div>
          </div>

          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-4 text-[11px] border-t">
              <div className="p-2 border-r italic">{item.name}</div>
              <div className="p-2 border-r text-center font-bold">
                {item.quantity}
              </div>
              <div className="p-2 border-r text-right">
                Rs. {item.price}
              </div>
              <div className="p-2 text-right font-semibold">
                Rs. {item.quantity * item.price}
              </div>
            </div>
          ))}
        </div>

        {/* ===== CLAIM EXTRA INFO ===== */}
        {isClaim && (
          <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 mb-6">
            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                Approved By
              </div>
              <div className="col-span-2 p-2">
                {claim?.approvedBy || "—"}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="bg-[#446b30] text-white text-[10px] font-bold p-2">
                Service Center
              </div>
              <div className="col-span-2 p-2">
                {claim?.serviceCenter}
              </div>
            </div>
          </div>
        )}

        {/* ===== REMARKS ===== */}
        <div className="border border-gray-300">
          <div className="bg-[#446b30] text-white text-xs font-bold p-3 uppercase">
            Remarks
          </div>
          <textarea
            rows="3"
            placeholder="Add a remark..."
            className="w-full p-2 border-none resize-none outline-none"
          />
        </div>

      </div>
    </div>
  );
};

export default Invoice;
