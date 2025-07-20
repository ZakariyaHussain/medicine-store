import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import CategoryCard from './CategoryCard';
import axios from 'axios';

const CategorySection = () => {
    const medicines = useLoaderData();
    console.log(medicines);
    const [categories, setCategories] = useState([]);
    console.log(categories);
    useEffect(() => {
        axios.get('http://localhost:5000/category-stats')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className='px-6 mx-auto'>
            <div className='mt-16 mb-10'>
                <h2 className='text-2xl font-bold text-center'>All Medicines By Category</h2>
            </div>
            {/* Cards */}
            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    medicines.map(medicine => <CategoryCard key={medicine._id} medicine={medicine} categories={categories}></CategoryCard>)
                }
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
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