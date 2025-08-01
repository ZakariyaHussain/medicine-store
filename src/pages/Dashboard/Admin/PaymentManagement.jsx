import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    }
  });

  // Approve a pending payment
  const approvePayment = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/payments/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Payment marked as paid');
      queryClient.invalidateQueries(['payments']);
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading payments...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment._id}>
                <td>{idx + 1}</td>
                <td>{payment.email}</td>
                <td>৳ {payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
                <td>
                  <span className={`badge ${payment.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                    {payment.status}
                  </span>
                </td>
                <td>
                  {payment.status === 'pending' ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => approvePayment.mutate(payment._id)}
                    >
                      Accept Payment
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
