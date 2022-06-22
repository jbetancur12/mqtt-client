import React, { useEffect, useState } from 'react'
import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import { useMQTT } from '../context/mqtt';
import Gauge from './Gauge'

const Status = () => {
  // const [temperature, setTemperature] = useState(0)
  const { connectionStatus } = useMqttState();
  const { message } = useSubscription([
    'topic_sensor_temperature',
    'topic_sensor_humidity',
  ]);
  const { setTemp, temperature, setHumidity, humidity } = useMQTT();



  useEffect(() => {
    if (message?.topic === 'topic_sensor_temperature') {
      console.log(message);
      setTemp(Number(message.message));
      // setMessages((messages) => [...messages, payload]);
    } else if (message?.topic === 'topic_sensor_humidity') {
      setHumidity(Number(message.message))
    }
  }, [message]);





  return (<><h1>{`Status: ${connectionStatus}`}</h1>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>{temperature}</span>
      <span>{humidity}</span>
      <Gauge value={temperature} domain={[0, 50]} ranges={{ low: 20, high: 32 }} />
      <Gauge value={humidity} domain={[0, 100]} ranges={{ low: 40, high: 60 }} />
    </div>
  </>);
}

export default Status