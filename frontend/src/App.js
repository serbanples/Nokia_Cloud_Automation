import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const search = async () => {
    if (name) {
      try {
        const response = await fetch(`http://localhost:5000/data/${name}`); // Update the endpoint URL here
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
        setError('');
      } catch (error) {
        setError('Failed to fetch data');
        setUserData(null);
        console.error('Error fetching data: ', error);
      }
    }
  };

  return (
    <div className="container">
      <center>
        <h1>Search for User Data</h1>
      </center>

      <div className="input-box">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <button
          type="button"
          className="search-button"
          onClick={search}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {userData && (
        <div className="data-container">
          <div className="box left-text">
            <p>Name</p>
            <p>Topology</p>
            <p>Owner</p>
            <p>VM1</p>
            <p>M-Plane</p>
            <p>VM2</p>
          </div>
          <div className="box right-text">
            <p>{userData[0].name}</p>
            <p>{userData[0].topology}</p>
            <p>{userData[0].owner}</p>
            <p>{userData[0].VM1}</p>
            <p>{userData[0].MPlane}</p>
            <p>{userData[0].VM2}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        className="search-button connect-button"
        onClick={search}
      >
        Connect
      </button>
    </div>
  );
}

export default App;
