import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthContext';
import { imageUrl } from '../../../api/Utility';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AskForAdvertisement = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch seller's own advertisement entries
  const { data: ads = [], refetch, isLoading } = useQuery({
    queryKey: ['advertisements', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements?sellerEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Form submission
  const handleAddAd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.image.files[0];
    const image = await imageUrl(file);
    const description = form.description.value;
    const name = form.itemName.value; // ✅ Make sure this matches input name
    console.log(form);

    const adData = {
      image,
      name,
      description,
      sellerEmail: user?.email,
      status: 'pending'
    };

    try {
      const res = await axiosSecure.post('/advertisements', adData);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Advertisement submitted for review!', 'success');
        setShowModal(false);
        console.log(showModal);
        refetch();
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting advertisement:", error);
    }
  };

  return (
    <div className='p-6'>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Advertisement Requests</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">+ Add Advertise</button>
      </div>

      {isLoading ? (
        <p className="text-center">Loading advertisements...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad, i) => (
                <tr key={i}>
                  <td>
                    <img src={ad.image} alt="Ad" className="w-20 h-20 object-cover rounded" />
                  </td>
                  <td>{ad.name || 'Unknown'}</td>
                  <td>{ad.description}</td>
                  <td>
                    <span className={`badge ${
                      ad.status === 'approved' ? 'badge-success' :
                      ad.status === 'pending' ? 'badge-warning' :
                      'badge-error'
                    }`}>
                      {ad.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-xl">
            <form method="dialog" className="modal-backdrop" onClick={() => setShowModal(false)}>
              <button>✕</button>
            </form>
            <h3 className="font-bold text-lg mb-4">Submit New Advertisement</h3>
            <form onSubmit={handleAddAd} className="space-y-4">
              <input type="text" name="itemName" placeholder="Medicine Name" className="input input-bordered w-full" required />
              <input type="file" name="image" accept="image/*" className="file-input w-full" required />
              <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Advertisement description..." required></textarea>
              <button type="submit" className="btn btn-accent w-full">Submit</button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AskForAdvertisement;
