import React, { useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { imageUrl } from '../../../api/Utility';
import useAxios from '../../../hooks/useAxios';

const ManageMedicine = () => {
    const { user } = React.useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const axiosSecure = useAxios();

    // TanStack Query to fetch medicines added by this seller
    const { data: medicines = [], refetch, isLoading } = useQuery({
        queryKey: ['medicines', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines?sellerEmail=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleAddMedicineForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const photo = form.image.files[0];
        const newPhotoUrl = await imageUrl(photo);

        const medicineData = Object.fromEntries(formData.entries());
        medicineData.sellerEmail = user?.email;
        medicineData.image = newPhotoUrl;
        medicineData.price = parseFloat(medicineData.price);
        medicineData.discount = parseFloat(medicineData.discount || 0);

        try {
            const res = await axios.post('https://medicine-store-seven.vercel.app/medicines', medicineData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "New medicine listing successful",
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch(); // re-fetch medicines
                setShowModal(false);
                form.reset();
            }
        } catch (err) {
            console.error("Error submitting medicine:", err);
        }
    };

    return (
        <div className='p-6'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Added Medicines</h2>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">+ Add Medicine</button>
            </div>

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Generic</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Category</th>
                                <th>Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((med, index) => (
                                <tr key={index}>
                                    <td><img src={med.image} alt={med.itemName} className="w-12 h-12 rounded" /></td>
                                    <td>{med.itemName}</td>
                                    <td>{med.genericName}</td>
                                    <td>৳{med.price}</td>
                                    <td>{med.discount || 0}%</td>
                                    <td>{med.category}</td>
                                    <td>{med.company}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <form method="dialog" className="modal-backdrop" onClick={() => setShowModal(false)}>
                            <button>✕</button>
                        </form>

                        <h3 className="font-bold text-lg mb-4">Add New Medicine</h3>
                        <form onSubmit={handleAddMedicineForm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="itemName" placeholder="Item Name" className="input input-bordered w-full" required />
                            <input type="text" name="genericName" placeholder="Generic Name" className="input input-bordered w-full" required />
                            <textarea name="description" placeholder="Short Description" className="textarea textarea-bordered col-span-2" />
                            <input type="file" name="image" accept="image/*" className="file-input w-full" required />

                            <select name="category" className="select select-bordered w-full">
                                <option value="Tablet">Tablet</option>
                                <option value="Capsule">Capsule</option>
                                <option value="Syrup">Syrup</option>
                                <option value="Injection">Injection</option>
                                <option value="Cream">Cream/Ointment</option>
                                <option value="Suppository">Suppository</option>
                                <option value="Other">Other</option>
                            </select>

                            <select name="company" className="select select-bordered w-full">
                                <option value="Beximco">Beximco</option>
                                <option value="Square">Square</option>
                                <option value="Acme">Acme</option>
                                <option value="Renata">Renata</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Other">Other</option>
                            </select>

                            <select name="unit" className="select select-bordered w-full">
                                <option value="Mg">Mg</option>
                                <option value="ML">ML</option>
                            </select>

                            <input type="number" name="price" placeholder="Price (৳)" className="input input-bordered w-full" required />
                            <input type="number" name="discount" defaultValue={0} placeholder="Discount %" className="input input-bordered w-full" />

                            <button type="submit" className="btn btn-accent col-span-2">Add Medicine</button>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageMedicine;
