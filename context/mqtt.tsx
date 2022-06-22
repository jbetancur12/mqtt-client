import { createContext, useState, useContext, useEffect } from 'react';

interface IContext {
  temperature: number
  setTemp: (value: number) => void
  humidity: number
  setHumidity: (value: number) => void
}

const MQTTContext = createContext<IContext>({ temperature: 0, setTemp: () => { }, humidity: 0, setHumidity: () => { } });


export const MQTTProvider = ({ children }: any) => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const setTemp = (value: number) => setTemperature(value);

  return (
    <MQTTContext.Provider value={{ temperature, setTemp, humidity, setHumidity }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);
