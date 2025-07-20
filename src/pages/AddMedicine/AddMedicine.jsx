import React, { use } from 'react';
//import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { imageUrl } from '../../api/Utility';
import { AuthContext } from '../../contexts/AuthContext';

const AddMedicine = () => {
    const { user } = use(AuthContext);

    const handleAddMedicineForm = async e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const photo = form.image.files[0];
        const newPhotoUrl = await imageUrl(photo);
        const medicineData = Object.fromEntries(formData.entries());
        medicineData.email = user?.email;
        medicineData.image = newPhotoUrl;
        console.log(medicineData);
        


        try {
            const res = await axios.post('http://localhost:5000/medicines', medicineData, newPhotoUrl);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "New medicine listing successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                //form.reset(); // optional
            }
        } catch (err) {
            console.error("Error submitting medicine:", err);
        }


    }


    return (
        <div className='p-10'>
            <div className='text-center px-4 mb-10'>
                <h1 className='text-2xl font-bold'>Add New Medicine</h1>
                <p>Enter full details of the medicine product including category, pricing, and dosage info.</p>
            </div>

            <form onSubmit={handleAddMedicineForm}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Item Name</label>
                        <input type="text" name='itemName' className="input w-full" placeholder="Enter item name" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Generic Name</label>
                        <input type="text" name='genericName' className="input w-full" placeholder="Enter generic name" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 md:col-span-2">
                        <label className="label">Short Description</label>
                        <textarea name='description' className="textarea w-full" placeholder="Enter short description"></textarea>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Image</label>
                        <input type="file" name='image' className="input w-full" accept='image/*' placeholder="Enter image" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Category</label>
                        <select name="category" className="select w-full bg-base-100 border border-base-300">
                            <option value="Tablet">Tablet</option>
                            <option value="Capsule">Capsule</option>
                            <option value="Syrup">Syrup</option>
                            <option value="Injection">Injection</option>
                            <option value="Ointment">Ointment</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Company</label>
                        <select name="company" className="select w-full bg-base-100 border border-base-300">
                            <option value="Beximco">Beximco</option>
                            <option value="Square">Square</option>
                            <option value="Acme">Acme</option>
                            <option value="Renata">Renata</option>
                            <option value="Other">Other</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Mass Unit</label>
                        <select name="unit" className="select w-full bg-base-100 border border-base-300">
                            <option value="Mg">Mg</option>
                            <option value="ML">ML</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Per Unit Price (৳)</label>
                        <input type="number" name='price' className="input w-full" placeholder="Enter price per unit" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Discount (%)</label>
                        <input type="number" name='discount' defaultValue={0} className="input w-full" placeholder="Enter discount percentage" />
                    </fieldset>
                </div>

                <button type="submit" className='btn bg-[#20b4af] w-full mt-8'>Add Medicine</button>
            </form>
        </div>
    );
};

export default AddMedicine;
