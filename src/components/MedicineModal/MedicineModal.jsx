// src/components/MedicineModal.jsx
import React from 'react';

const MedicineModal = ({ medicine, isOpen, onClose }) => {
  if (!isOpen || !medicine) return null;
  const { image, itemName, genericName, description, category, company, unit, price, discount} = medicine;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">{itemName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={image}
            alt={itemName}
            className="rounded w-full"
          />
          <div>
            <p><strong>Generic Name:</strong> {genericName}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Company:</strong> {company}</p>
            <p><strong>Mass Unit:</strong> {unit}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Discount:</strong> {discount || 0}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;
