import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";

function InputForm() {
  const [inputData, setInputData] = useState({
    name: '',
    job: '',
    city: '',
    salary: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(inputData.salary)) {
      console.error('Salary must be a numberr');
      return;
    }

    axios
      .post('https://saudi-freelance1.onrender.com/inputs', inputData)
      .then((response) => {
        console.log('Input created:', response.data);
        setInputData({
          name: '',
          job: '',
          city: '',
          salary: '',
        });
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error creating input:', error);
        // Display an error message to the user
      });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='mt-10'> 
      <h2 className="text-3xl font-semibold mb-4 text-cyan-700">سجل كمحترف</h2>
      <p className='font-bold m-10 text-lg'>ابدأ رحلتك كمحترف مستقل من خلال المنصة التي تساعدك في الحصول على عملاء موثوقين في مدينتك </p>
      {/* Button to open the modal */}
      <button
        onClick={handleOpenModal}
        className="p-2 bg-gray-400 text-white rounded hover:bg-cyan-900 px-10 text-lg mb-10 "
      >
        انقر هنا
      </button>

      {/* Modal */}

      {showModal && (
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

          <form onSubmit={handleSubmit}>
          <label className="block mb-2 ">
            الإسم :
            <input
              type="text"
              name="name"
              value={inputData.name}
              onChange={handleChange}
              placeholder="الإسم"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
           العمل : 
            <input
              type="text"
              name="job"
              value={inputData.job}
              onChange={handleChange}
              placeholder="العمل"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            المدينة :
            <input
              type="text"
              name="city"
              value={inputData.city}
              onChange={handleChange}
              placeholder="المدينة"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            السعر بالساعة : 
            <input
              type="text"
              name="salary"
              value={inputData.salary}
              onChange={handleChange}
              placeholder="السعر"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>
          </form>

          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="submit"
              className="p-2 bg-cyan-700 text-white rounded hover:bg-cyan-900 ml-4"
              onClick={handleSubmit}
            >
              إنشاء
            </button>
            <button
              onClick={handleCloseModal}
              className="p-2 bg-gray-400 text-white rounded hover:bg-gray-700"
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
}

export default InputForm;
