import React, { useState, createContext, useContext } from 'react';
import "./styles/inputData.css"
import { PollutionDataContext } from './pollContext';


function InputData() {
    const { polData, addPolData, deletePolData } = useContext(PollutionDataContext);
  const [pollution, setPollution] = useState({
    lat: "",
    long: "",
    PM2: "",
    PM10: "",
    NO2: "",
    SO2: "",
    O3: ""
  });
  const [pollutionData, setPollutionData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;  
    setPollution((prevPollution) => ({
      ...prevPollution,  
      [name]: value  
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    addPolData(pollution);
    setPollutionData((prevData) => [...prevData, pollution]);
  };
  const handleDelete = (index) => {
    setPollutionData((prevData) => prevData.filter((_, i) => i !== index));
    deletePolData(index);
  };

 

  return (
    <>

        <div className="inputData">
        <h1 className='handlertext'>Input Handler</h1>
        <form onSubmit={handleSubmit} className='inputsDisp'>
            <div>
                <h3 >Latitude:</h3>
                <input
                type="number"
                step="any"
                name="lat"
                className='inputs'
                value={pollution.lat}
                onChange={handleChange}
                />
            </div>
            <div>
                <h3 >Longitude:</h3>
                <input
                type="number"
                step="any"
                name="long"
                className='inputs'
                value={pollution.long}
                onChange={handleChange}
                />
            </div>
            <div>
                <h3 >PM2:</h3>
                <input
                type="number"
                step="any"
                name="PM2"
                className='inputs'
                value={pollution.PM2}
                onChange={handleChange}
                />
            </div>
            <div>
                <h3 >PM10:</h3>
                <input
                type="number"
                step="any"
                name="PM10"
                className='inputs'
                value={pollution.PM10}
                onChange={handleChange}
                />
            </div>
            <div>
                <h3 >NO2:</h3>
                <input
                type="number"
                step="any"
                name="NO2"
                className='inputs'
                value={pollution.NO2}
                onChange={handleChange}
                />
            </div>
            <div>
                <h3 >SO2:</h3>
                <input
                type="number"
                step="any"
                name="SO2"
                className='inputs'
                value={pollution.SO2}
                onChange={handleChange}
                />
            </div>
            <div>
                <h3 >O3:</h3>
                <input
                type="number"
                step="any"
                name="O3"
                className='inputs'
                value={pollution.O3}
                onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit" className='handlerbutton'>Submit</button>
            </div>
        </form>
        </div>
        <div className='listDisp'>
            <h1>Pollutions Added</h1>
            <ul>
                {pollutionData.map((item, index) => (
                    <li key={index}>
                        <div className='pollutionItem'>
                            <p><strong>Latitude:</strong> {item.lat}</p>
                            <p><strong>Longitude:</strong> {item.long}</p>
                            <p><strong>PM2:</strong> {item.PM2}</p>
                            <p><strong>PM10:</strong> {item.PM10}</p>
                            <p><strong>NO2:</strong> {item.NO2}</p>
                            <p><strong>SO2:</strong> {item.SO2}</p>
                            <p><strong>O3:</strong> {item.O3}</p>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    </>
  );
}

export default InputData;
