import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import MedicineModal from '../../components/MedicineModal/MedicineModal';
import useAxios from '../../hooks/useAxios';
import { useCart } from '../../contexts/CartContext';


const Shop = () => {
  const axiosSecure = useAxios();
  const { addToCart } = useCart();

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Fetch with TanStack Query
  const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const res = await axiosSecure.get('/medicines');
      return res.data;
    },
  });

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedMedicine(null);
    setIsModalOpen(false);
  };

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    toast.success(`${medicine.itemName} added to cart!`);
  };

  if (isLoading) return <div className="p-5">Loading...</div>;
  if (isError) return <div className="p-5 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Shop Medicines</h2>
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
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAddToCart(med)}
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

      {/* Modal View */}
      <MedicineModal
        medicine={selectedMedicine}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default Shop;
