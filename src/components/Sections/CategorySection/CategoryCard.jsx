import React from 'react';
import { Link } from 'react-router';



const CategoryCard = ({ medicine }) => {
    const { category, image } = medicine || {};
    console.log(medicine);



    return (
        <Link to={`/category/${category}`}>
            <div className="card bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <p className="text-lg font-bold">Category Name: <span className='font-normal'>{category}</span></p>
                    <p className='text-lg font-bold'>Medicines Number (In this Category): <span className='font-normal'>{category}</span></p>
                    <div className="card-actions">
                        <button className="btn bg-green-400 text-white hover:touch-pinch-zoom">Book Now</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;