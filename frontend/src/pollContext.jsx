import React, { createContext, useState } from 'react';

export const PollutionDataContext = createContext();

export const PollutionDataProvider = ({ children }) => {
  const [polData, setPolData] = useState([]);

  const addPolData = (newData) => {
    setPolData((prevData) => [...prevData, newData]);
  };
  const deletePolData = (index) => {
    setPolData((prevData) => prevData.filter((_, i) => i !== index));
  };


  return (
    <PollutionDataContext.Provider
      value={{
        polData,       // Provide the pollution data
        addPolData,     // Provide the addPollutionData function
        deletePolData,  // Provide the deletePollutionData function
      }}
    >
      {children}
    </PollutionDataContext.Provider>
  );
};