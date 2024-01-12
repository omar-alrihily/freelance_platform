import React from 'react';

const FreeLancers = ({ FreeLancer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {FreeLancer.map((input) => (
      <div key={input._id} className="border border-gray-300 p-6 rounded-md shadow-md">
        <p className="text-gray-800 font-semibold">{input.name}</p>
        <p className="text-gray-600">{input.job}, {input.city}</p>
        <p className="text-gray-600">Salary: {input.salary}</p>
      </div>
    ))}
</div>

  

  );
};

export default FreeLancers;