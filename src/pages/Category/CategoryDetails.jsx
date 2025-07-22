// import React, { useEffect, useState } from 'react';
// import { Eye } from 'lucide-react'; // Lucide icon for eye
// //import { useNavigate } from 'react-router-dom';
// import MedicineModal from '../../components/MedicineModal/MedicineModal';
// import axios from 'axios';
// import { Link } from 'react-router';

// const CategoryDetails = () => {
// const [medicines, setMedicines] = useState([]);
// const [selectedMedicine, setSelectedMedicine] = useState(null);
// const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//     // Fetch data from backend
//     axios.get('http://localhost:5000/medicines')
//       .then(res => setMedicines(res.data))
//       .catch(err => console.error("Error fetching medicines:", err));
//   }, []);

//     const handleView = (medicine) => {
//         setSelectedMedicine(medicine);
//         setIsModalOpen(true);
//     };

//     const handleClose = () => {
//         setIsModalOpen(false);
//         setSelectedMedicine(null);
//     };

//     return (
// <div className="p-5">
//     <h2 className="text-xl font-bold mb-4">Shop Page</h2>
//     <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//             <thead>
//                 <tr>
//                     <th>#</th>
//                     <th>Item</th>
//                     <th>Generic</th>
//                     <th>Price</th>
//                     <th>Discount</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {medicines.map((med, index) => (
//                     <tr key={med._id}>
//                         <td>{index + 1}</td>
//                         <td>{med.itemName}</td>
//                         <td>{med.genericName}</td>
//                         <td>{med.price}</td>
//                         <td>{med.discount || 0}%</td>
//                         <td className="flex gap-2">
//                             <Link to={`/medicines/${med._id}`}><button className="btn btn-sm btn-primary">Select</button></Link>
//                             <button
//                                 className="btn btn-sm btn-outline"
//                                 onClick={() => handleView(med)}
//                             >
//                                 <Eye size={18} />
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>

//     {/* Modal Component */}
//     <MedicineModal
//         medicine={selectedMedicine}
//         isOpen={isModalOpen}
//         onClose={handleClose}
//     />
// </div>
//     );
// };

// export default CategoryDetails;

//start
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react'; // Lucide icon for eye
//import { useNavigate } from 'react-router-dom';
import MedicineModal from '../../components/MedicineModal/MedicineModal';
//import axios from 'axios';
import { Link } from 'react-router';
import { useCart } from '../../contexts/CartContext';

const CategoryDetails = () => {
    const { categoryName } = useParams();
    const [medicines, setMedicines] = useState([]);
    //const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { addToCart } = useCart();



    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const res = await axios.get('http://localhost:5000/medicines'); // or your endpoint
                const filtered = res.data.filter(med => med.category === categoryName);
                setMedicines(filtered);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMedicines();
    }, [categoryName]);

    const handleView = (medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
    };

    return (
        // <div className="p-6">
        //   <h1 className="text-2xl font-bold mb-4">Category: {categoryName}</h1>
        //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        //     {medicines.map(med => (
        //       <div key={med._id} className="card bg-base-100 shadow p-4">
        //         <img src={med.image} alt={med.itemName} className="h-32 w-full object-cover" />
        //         <h2 className="font-bold">{med.itemName}</h2>
        //         <p>{med.genericName}</p>
        //         <p>৳{med.price}</p>
        //       </div>
        //     ))}
        //   </div>
        // </div>

        //start
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

export default CategoryDetails;

