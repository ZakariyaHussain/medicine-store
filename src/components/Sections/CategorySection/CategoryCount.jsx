import React from 'react';

const CategoryCount = () => {
    const categoryCounts = categories.map(cat => {
        const filtered = medicines.filter(m => m.category === cat);
        return {
            category: cat,
            image: filtered[0]?.image || '',  // use first image or default
            count: filtered.length
        };
    });
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {categoryCounts.map(data => (
                <CategoryCard
                    key={data.category}
                    category={data.category}
                    image={data.image}
                    count={data.count}
                />
            ))}
        </div>
    );
};

export default CategoryCount;