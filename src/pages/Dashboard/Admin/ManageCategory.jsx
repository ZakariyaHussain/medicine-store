import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/categories');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id}>
              <td>{index + 1}</td>
              <td>
                <img src={cat.categoryImage} alt={cat.categoryName} className="w-16 h-16 object-cover rounded" />
              </td>
              <td>{cat.categoryName}</td>
              <td>
                {/* Add update/delete buttons here */}
                <button className="btn btn-xs btn-warning">Update</button>
                <button className="btn btn-xs btn-error ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;
