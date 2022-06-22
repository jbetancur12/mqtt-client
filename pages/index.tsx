import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import HookMqtt from '../components';
import styles from '../styles/Home.module.css';
import Gaguge from '../components/Gauge';
import { useMQTT } from '../context/mqtt';
import { Connector } from 'mqtt-react-hooks';
import { IClientOptions } from 'mqtt'
import Status from '../components/Status';

const Home: NextPage = () => {
  const { temperature } = useMQTT();

  const options: IClientOptions = {
    keepalive: 30,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    clientId: 'kwklkdlsk',
    username: 'jbetancur12',
    password: 'jorge900',
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  };


  return (
    <div className={styles.container}>
      {/* <HookMqtt /> */}
      <Connector brokerUrl="ws://rf09deee.us-east-1.emqx.cloud:8083/mqtt" options={options}>
        <Status />
      </Connector>
      {/* <Gaguge value={temperature} /> */}
    </div>
  );
};

export default Home;
