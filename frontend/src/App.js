import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Box from '@material-ui/core/Box';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    //TBC...
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [query, setQuery] = useState("");
  const search_parameters = Object.keys(Object.assign({}, ...data));

  function search(data) {
    return data.filter((data) => 
      search_parameters.some((parameter) =>
        data[parameter].toString().toLowerCase().includes(query)
      )
    );
  }

  return (
    <div className="container">
      <center>
        <h1>punem titlu?</h1>
      </center>

      <div className="input-box">
      <input
          type="search" //SA MEARGA LA ENTER
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          />

          <button
            type="button"
            className="search-button"
            onClick={() => search(data)}>
              <FontAwesomeIcon icon={faSearch} />
          </button>
      </div>
        
        <h2 className="">aici trebe ceva??</h2>
        <div className='box-container'>
          <div className="box left-text">    
            <p>Name</p>
            <p>Topology</p>
            <p>Owner</p>
            <p>VM1</p>
            <p>M-Plane</p>
            <p>VM2</p>
          </div>

          <div className="box right-text">    
            <p>SBTS1179</p>
            <p>CLOUD_SRAN_NR_1179_ABIO_AEHC</p>
            <p>Iasmin</p>
            <p>10.6.21.179</p>
            <p>15.20.247.79</p>
            <p>0</p>
          </div>
        </div>

        <button
            type="connect"
            className="search-button connect-button"
            onClick={() => search(data)}>
                Connectttttt          
        </button>

    </div>
  );
}

export default App;