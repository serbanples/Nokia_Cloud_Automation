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
        const response = await fetch(`http://127.0.0.1:5000/data/${name}`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        if (data.length === 0) {
          setError('Name not found');
          setUserData(null);
        } else {
          setUserData(data);
          setError('');
        }
      } catch (error) {
        setError('Failed to fetch data');
        setUserData(null);
        console.error('Error fetching data: ', error);
      }
    }
    else {
      setError('Please enter a name');
      setUserData(null);
    }
  };
  

  const connect = async () => {
    if (userData && userData.length > 0) {
      try {
        const response = await fetch('http://127.0.0.1:5000/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: userData[0].owner,
            VM1: userData[0].VM1,
            VM2: userData[0].VM2
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error connecting: ', error);
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
        <div className="box-container">
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
        onClick={connect}
      >
        Connect
      </button>
    </div>
  );
}

export default App;

