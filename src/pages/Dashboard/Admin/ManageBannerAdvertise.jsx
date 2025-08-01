import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
//import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Switch } from '@headlessui/react';
import toast from 'react-hot-toast';
import useAxios from '../../../hooks/useAxios';

const ManageBannerAdvertise = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Fetch all advertisements
  const { data: advertisements = [], isLoading } = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/advertisements');
      return res.data;
    }
  });

  // Toggle status mutation
  const toggleMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      console.log("Toggling status for ID:", id, "to:", status);
      return await axiosSecure.patch(`/advertisements/toggle/${id}`, { status });
    },
    onSuccess: () => {
      toast.success('Advertisement status updated');
      queryClient.invalidateQueries(['advertisements']);
    }
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Seller Email</th>
              <th>Add to Slide</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((ad, index) => (
              <tr key={ad._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={ad.image} alt={ad.name} className="w-20 h-16 object-cover rounded" />
                </td>
                <td>{ad.name}</td>
                <td>{ad.description}</td>
                <td>{ad.sellerEmail}</td>
                <td>
                  <Switch
                    checked={ad.status === 'approved'}
                    onChange={() => {
                      toggleMutation.mutate({
                        id: ad._id,
                        status: ad.status === 'approved' ? 'pending' : 'approved'
                      });
                    }}
                    className={`${
                      ad.status === 'approved' ? 'bg-green-500' : 'bg-gray-300'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                  >
                    <span
                      className={`${
                        ad.status === 'approved' ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBannerAdvertise;
