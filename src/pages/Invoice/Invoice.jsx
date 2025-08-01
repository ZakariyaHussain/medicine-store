import React, { useRef } from 'react';
//import { useLocation } from 'react-router';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useLocation } from 'react-router-dom';


const Invoice = () => {
  const { state } = useLocation();
  const tableRef = useRef();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <img src="https://i.ibb.co/0VskKqhF/logo.jpg" alt="Logo" />
        <h2 className="text-xl font-bold">Invoice</h2>
        <DownloadTableExcel
          filename={`Invoice_${state.transactionId}`}
          sheet="invoice_data"
          currentTableRef={tableRef.current}
        >
          <button className="btn btn-outline btn-sm">Print/Download</button>
        </DownloadTableExcel>
      </div>

      <table ref={tableRef} className="table w-full border border-gray-200">
        <thead>
          <tr>
            <td colSpan="2"><strong>Transaction ID:</strong> {state.transactionId}</td>
            <td colSpan="2"><strong>Date:</strong> {state.date}</td>
          </tr>
          <tr>
            <td colSpan="2"><strong>Name:</strong> {state.user.name}</td>
            <td colSpan="2"><strong>Email:</strong> {state.user.email}</td>
          </tr>
          <tr className="bg-gray-200">
            <th className="p-2">Medicine Name</th>
            <th className="p-2">Company</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {state.cartItems.map((item) => (
            <tr key={item._id}>
              <td className="p-2">{item.itemName}</td>
              <td className="p-2">{item.company}</td>
              <td className="p-2">{item.price} ৳</td>
              <td className="p-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="p-2 font-bold text-right">
              Grand Total: {state.total} ৳
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Invoice;
