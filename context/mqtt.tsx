import { createContext, useState, useContext, useEffect } from 'react';
const MQTTContext = createContext({});

export const MQTTProvider = ({ children }) => {
  const [temperature, setTemperature] = useState(0);

  const setTemp = (value) => setTemperature(value);

  return (
    <MQTTContext.Provider value={{ temperature, setTemp }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);
