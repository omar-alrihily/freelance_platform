import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InputList() {
  const [inputs, setInputs] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost:5000/inputs')
      .then(response => {
        setInputs(response.data);
      })
      .catch(error => {
        console.error('Error fetching inputs: ', error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data immediately on component mount

    const interval = setInterval(() => {
      fetchData(); // Fetch data at intervals (e.g., every 5 seconds)
    }, 5000); // Adjust the interval time as needed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
    
      <ul>
        {inputs.map(input => (
          <li key={input._id}>
            FreeLancser: {input.name}, {input.job}, {input.city}, {input.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InputList;
