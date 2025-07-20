import React from 'react';
import { useLoaderData } from 'react-router';
import CategoryCard from './CategoryCard';

const CategorySection = () => {
    const medicines = useLoaderData();
    console.log(medicines);
    return (
        <div className='px-6 mx-auto'>
                <div className='mt-16 mb-10'>
                    <h2 className='text-2xl font-bold text-center'>All Medicines By Category</h2>
                </div>
                {/* Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        medicines.map(medicine => <CategoryCard key={medicine._id} medicine={medicine}></CategoryCard>)
                    }
                </div>
            </div>
    );
};

export default CategorySection;