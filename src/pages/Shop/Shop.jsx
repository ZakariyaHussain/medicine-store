import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
//import axios from 'axios';
import { Eye } from 'lucide-react';
import MedicineModal from '../../components/MedicineModal/MedicineModal';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useCart } from '../../contexts/CartContext';

// const fetchMedicines = async () => {
//   const res = await axios.get('http://localhost:5000/medicines');
//   return res.data;
// };



const Shop = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMedicines = async () => {
        //const res = await axios.get('http://localhost:5000/medicines');
        const res = await axiosSecure.get('/medicines');
        return res.data;
    };
    const { data: medicines = [], isLoading, isError, error } = useQuery({
        queryKey: ['medicines'],
        queryFn: fetchMedicines,
    });

    const handleView = (medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
    };

    const { addToCart } = useCart(); // get addToCart function


    if (isLoading) return <div className="p-5">Loading...</div>;
    if (isError) return <div className="p-5 text-red-600">Error: {error.message}</div>;

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-4">Shop Page</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Generic</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((med, index) => (
                            <tr key={med._id}>
                                <td>{index + 1}</td>
                                <td>{med.itemName}</td>
                                <td>{med.genericName}</td>
                                <td>{med.price} ৳</td>
                                <td>{med.discount || 0}%</td>
                                <td className="flex gap-2">
                                    {/* <Link to={`/medicines/${med._id}`}>
                                        <button className="btn btn-sm btn-primary">Select</button>
                                    </Link> */}
                                    {/* <Link to={`/medicines/${med._id}`}><button className="btn btn-sm btn-primary">Select</button></Link> */}

                                    {/* <Link to={`/medicines/${med._id}`}>
                                        <button
                                            className="btn btn-sm btn-primary"

                                            onClick={() => {
                                                console.log('Selected:', med.itemName);
                                                addToCart(med)
                                            }}
                                        >
                                            Select
                                        </button>
                                    </Link> */}
                                    <button
                                        className="btn btn-sm btn-primary"
                                        
                                        onClick={() => {
                                            console.log('Selected:', med.itemName);
                                            addToCart(med)}}
                                    >
                                        Select
                                    </button>


                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => handleView(med)}
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Component */}
            <MedicineModal
                medicine={selectedMedicine}
                isOpen={isModalOpen}
                onClose={handleClose}
            />
        </div>
    );
};

export default Shop;
