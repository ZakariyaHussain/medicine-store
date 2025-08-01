import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import MedicineModal from '../../components/MedicineModal/MedicineModal';
import { useCart } from '../../contexts/CartContext';
import useAxios from '../../hooks/useAxios';


const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const axiosSecure = useAxios();

  // Fetch all medicines
  const { data: medicines = [], isLoading, isError } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const res = await axiosSecure.get('/medicines');
      return res.data;
    },
  });

  const filteredMedicines = medicines.filter(
    (med) => med.category === categoryName
  );

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const handleAddToCart = (med) => {
    addToCart(med);
    toast.success(`${med.itemName} added to cart!`);
  };

  if (isLoading) return <p className="p-6">Loading medicines...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load medicines.</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Category: {categoryName}</h2>
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
            {filteredMedicines.map((med, index) => (
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

      {/* Modal Component */}
      <MedicineModal
        medicine={selectedMedicine}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default CategoryDetails;
