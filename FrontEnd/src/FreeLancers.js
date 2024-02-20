import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion library

const FreeLancers = ({ FreeLancer }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (selectedInput) => {
    setSelectedItem(selectedInput);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {FreeLancer.map((input) => (
          <div
            key={input._id}
            className="border bg-cyan-700 p-6 rounded-md shadow-md cursor-pointer"
            onClick={() => handleItemClick(input)}
          >
            <p className="text-white font-semibold">{input.name}</p>
            <p className="text-white">العمل: {input.job}</p>
            <p className="text-white">المدينة: {input.city}</p>
            <p className="text-white">السعر: {input.salary}</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div>
          {/* Grey overlay for the background */}
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
            onClick={handleCloseModal}
          ></div>

          {/* Modal content */}
          <div className="fixed inset-0 z-20 overflow-y-auto flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center min-h-screen"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 w-96 rounded shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-4 text-cyan-700">بيانات المحترف</h2>

                {/* Render details of selected item */}
                <p>الإسم: {selectedItem.name}</p>
                <p>العمل: {selectedItem.job}</p>
                <p>المدينة: {selectedItem.city}</p>
                <p>السعر: {selectedItem.salary}</p>

                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    className="p-2 bg-cyan-700 text-white rounded hover:bg-cyan-900 ml-4"
                    onClick={handleCloseModal}
                  >
                    إغلاق
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeLancers;
