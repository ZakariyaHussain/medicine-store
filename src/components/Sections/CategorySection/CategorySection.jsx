import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import useAxios from '../../../hooks/useAxios';



const CategorySection = () => {
    const medicines = useLoaderData();
    console.log(medicines);
    const axiosSecure = useAxios();

    
    const { data: categories = [], isLoading, isError, error } = useQuery({
        queryKey: ['categoryStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/category-stats');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className='px-6 mx-auto'>
            <div className='mt-16 mb-10'>
                <h2 className='text-2xl font-bold text-center'>All Medicines By Category</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {categories.map(cat => (
                    <CategoryCard
                        key={cat.category}
                        category={cat.category}
                        image={cat.image}
                        count={cat.count}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategorySection;

