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
        <h1>Ceva titlu ce zic bossii</h1>
      </center>

      <div className="input-box">
      <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          />

        {/* <center>
          {search(data).map((dataObj) => {
            return (
              <div className="box">
                <div class="card">
                  <div class="category">@{dataObj.username} </div>
                  <div class="heading">
                    {dataObj.name}
                    <div class="author">{dataObj.email}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </center> */}

        <button
          type="button"
          className="search-button"
          onClick={() => search(data)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        </div>

        <div style={{ 
            marginLeft: '40%', 
            marginTop: '60px', 
            width: '30%'
        }}>
            {/* <Box color="white"
                bgcolor="palevioletred" p={1}>
                Greetings from GeeksforGeeks!
            </Box> */}
        </div>

    </div>


  );
}

export default App;