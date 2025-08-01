import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // Role update mutation
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries(['users']);
    }
  });

  const handleRoleChange = (user, newRole) => {
    if (user.role === newRole) {
      toast('User already has this role.');
      return;
    }
    roleMutation.mutate({ id: user._id, role: newRole });
  };

  if (isLoading) return <p className="text-center">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.email}</td>
                <td>
                  <span className="capitalize badge badge-outline">
                    {user.role || 'user'}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleRoleChange(user, 'seller')}
                  >
                    Make Seller
                  </button>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleRoleChange(user, 'admin')}
                  >
                    Make Admin
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleRoleChange(user, 'user')}
                  >
                    Downgrade to User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
