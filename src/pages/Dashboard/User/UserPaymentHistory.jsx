import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useUserPayments from '../../../hooks/useUserPayments';



const UserPaymentHistory = () => {
    const { user } = useAuth();
    const [payments, isLoading] = useUserPayments(user?.email);

    if (isLoading) {
        return <div className="text-center py-10 text-blue-600 font-semibold">Loading payment history...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Payment History</h2>

            {payments.length === 0 ? (
                <div className="text-gray-500">No payments found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Amount</th>
                                <th className="border px-4 py-2">Transaction ID</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{payment.amount} ৳</td>
                                    <td className="border px-4 py-2">{payment.transactionId || 'N/A'}</td>
                                    <td className="border px-4 py-2">{payment.date ? new Date(payment.date).toLocaleString() : 'N/A'}</td>
                                    <td className="border px-4 py-2 capitalize">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${payment.status === 'paid' ?'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {payment.status || 'pending'}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserPaymentHistory;
