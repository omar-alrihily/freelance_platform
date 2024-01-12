import React, { useState } from 'react';
import axios from 'axios';

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
      .post('http://localhost:5000/inputs', inputData)
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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Input</h2>

      {/* Button to open the modal */}
      <button
        onClick={handleOpenModal}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Show InputForm
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 w-96 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Create Input</h2>

              <form onSubmit={handleSubmit}>
                {/* Input fields */}
                {/* ... */}
                <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={inputData.name}
              onChange={handleChange}
              placeholder="Name"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            Job:
            <input
              type="text"
              name="job"
              value={inputData.job}
              onChange={handleChange}
              placeholder="Job"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            City:
            <input
              type="text"
              name="city"
              value={inputData.city}
              onChange={handleChange}
              placeholder="City"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            Salary:
            <input
              type="text"
              name="salary"
              value={inputData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="block w-full p-2 border rounded mt-1"
            />
          </label>
        

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                  >
                    Create
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputForm;
