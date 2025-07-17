import React, { useEffect, useState } from 'react';

const Shop = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/medicines')
            .then(res => res.json())
            .then(data => setMedicines(data));
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-4">Available Medicines</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Generic Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Mass Unit</th>
                            <th>Price</th>
                            <th>Discount (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((med, index) => (
                            <tr key={med._id}>
                                <td>{index + 1}</td>
                                <td>{med.itemName}</td>
                                <td>{med.genericName}</td>
                                <td>{med.description}</td>
                                <td>
                                    <img src={med.imageURL} alt={med.itemName} className="w-16 h-16 object-cover" />
                                </td>
                                <td>{med.category}</td>
                                <td>{med.company}</td>
                                <td>{med.massUnit}</td>
                                <td>{med.price}</td>
                                <td>{med.discount || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Shop;
