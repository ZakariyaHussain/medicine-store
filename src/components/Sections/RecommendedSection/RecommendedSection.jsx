import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const RecommendedSection = () => {
  const axiosSecure = useAxios();

  const { data: recommended = [], isLoading, isError, error } = useQuery({
    queryKey: ['recommendedMedicines'],
    queryFn: async () => {
      const res = await axiosSecure.get('/recommended-medicines');
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center py-10 text-lg">Loading recommended medicines...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className='my-12 px-6'>
      <h2 className='text-center text-2xl font-bold mb-8'> Recommended for You</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {recommended.map(med => (
          <div key={med._id} className='card bg-base-100 shadow-md border'>
            <figure className='max-h-[200px] overflow-hidden'>
              <img src={med.image} alt={med.name} className="w-full h-[200px] object-cover" />
            </figure>
            <div className='card-body'>
              <h3 className='text-lg font-bold'>{med.name}</h3>
              <p>Price: {med.price} ৳</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;
