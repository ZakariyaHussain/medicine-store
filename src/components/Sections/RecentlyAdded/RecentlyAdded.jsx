import React from 'react';
import { useQuery } from '@tanstack/react-query';
//import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { data, Link } from 'react-router-dom';

const RecentlyAdded = () => {
  //const axios = useAxios();
  const axios = useAxiosSecure();

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ['recentMedicines'],
    queryFn: async () => {
      const res = await axios.get('/medicines/recent');
      return res.data;
    }
  });
  console.log(data);

  return (
    <div className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
         Recently Added Medicines
      </h2>

      {isLoading ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-4 border rounded shadow">
              <div className="h-40 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((med) => (
            <div
              key={med._id}
              className="card bg-white border shadow-sm rounded-lg hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={med.image || '/placeholder.jpg'}
                  alt={med.name || 'Unnamed'}
                  className="w-full h-48 object-cover rounded-t"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-lg font-semibold text-gray-800">{med.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{med.category || 'Uncategorized'}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">৳{med.price}</span>
                  {med.discount > 0 && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 rounded text-sm">
                      -{med.discount}% OFF
                    </span>
                  )}
                </div>
                <Link
                  to={`/medicine/${med._id}`}
                  className="btn btn-sm btn-outline mt-3 w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
