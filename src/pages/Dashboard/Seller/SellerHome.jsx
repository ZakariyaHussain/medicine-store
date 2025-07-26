import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const SellerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [revenue, setRevenue] = useState({ paidTotal: 0, pendingTotal: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/seller-revenue?email=${user.email}`)
        .then(res => {
          setRevenue(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch revenue:', err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Seller Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-100 border border-green-400 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Paid Revenue</h3>
          <p className="text-2xl font-bold text-green-700">{revenue.paidTotal} ৳</p>
        </div>

        <div className="bg-yellow-100 border border-yellow-400 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Pending Revenue</h3>
          <p className="text-2xl font-bold text-yellow-700">{revenue.pendingTotal} ৳</p>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
