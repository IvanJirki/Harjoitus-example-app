import React, { createContext, useState, useContext } from 'react';

const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const [selectedSports, setSelectedSports] = useState([]);

  const addSport = (sport, level, date, time) => {
    const newSport = { sport, level, date, time };

    setSelectedSports(prevSports => {
      const updatedSports = [...prevSports, newSport];
      return updatedSports.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      });
    });
  };

  const removeSport = (sportToRemove) => {
    setSelectedSports(prevSports => 
      prevSports.filter(sport => sport.sport !== sportToRemove.sport || sport.date !== sportToRemove.date || sport.time !== sportToRemove.time)
    );
  };

  return (
    <SportContext.Provider value={{ selectedSports, addSport, removeSport }}>
      {children}
    </SportContext.Provider>
  );
};

export const useSports = () => useContext(SportContext);
