// ModalForm.js
import React, { useState } from 'react';

const ModalForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    ip: '',
    os: '',
    cpu: '',
    memory: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();  // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-2/5">
        <h2 className="text-2xl mb-6">Add New VM</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">IP</label>
              <input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">OS</label>
              <input
                type="text"
                name="os"
                value={formData.os}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">CPU</label>
              <input
                type="text"
                name="cpu"
                value={formData.cpu}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Memory</label>
              <input
                type="text"
                name="memory"
                value={formData.memory}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
