import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['totalRevenue'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/total-revenue');
      return res.data;
    }
  });

  const { paidTotal = 0, pendingTotal = 0 } = data;

  if (isLoading) return <p>Loading revenue...</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Paid Total</h3>
          <p className="text-xl font-bold text-green-600">{paidTotal} ৳</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Pending Total</h3>
          <p className="text-xl font-bold text-yellow-600">{pendingTotal} ৳</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
