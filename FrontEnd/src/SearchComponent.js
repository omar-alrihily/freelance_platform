import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FreeLancers from './FreeLancers';

const SearchComponent = () => {
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [displayAllData, setDisplayAllData] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/inputs');
      if (response.status === 200) {
        if (displayAllData) {
          setSearchResults(response.data);
          setError('');
        }
      } else {
        setError('No data available.');
        setSearchResults([]);
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inputs');
        if (response.status === 200 && displayAllData) {
          setSearchResults(response.data);
          setError('');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
        setSearchResults([]);
      }
    };
  
    fetchData(); // Fetch data immediately on component mount
  
    const interval = setInterval(() => {
      fetchData(); // Fetch data at intervals (e.g., every 5 seconds)
    }, 5000); // Adjust the interval time as needed
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [displayAllData]);
  

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      if (!job && !city) {
        setDisplayAllData(true);
      } else {
        const response = await axios.get(`http://localhost:5000/search?job=${job}&city=${city}`);
        if (response.status === 200) {
          setSearchResults(response.data);
          setError('');
          setDisplayAllData(false);
        } else {
          setError('No results found.');
          setSearchResults([]);
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'An error occurred while fetching data.');
      } else {
        setError('An error occurred while fetching data.');
      }
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="p-4 space-y-4">
    <input
      type="text"
      placeholder="Enter job"
      value={job}
      onChange={(e) => setJob(e.target.value)}
      className="p-2 border rounded"
    />
    <input
      type="text"
      placeholder="Enter city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="p-2 border rounded"
    />
    {isLoading ? (
      <p className="text-gray-600">Loading...</p>
    ) : (
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    )}
    {error && <p className="text-red-500">{error}</p>}
    {searchResults.length > 0 ? (
      <FreeLancers FreeLancer={searchResults} />
    ) : (
      <p className="text-gray-600">No results found.</p>
    )}
</div>

  
  );
};

export default SearchComponent;
