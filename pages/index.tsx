import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import HookMqtt from '../components';
import styles from '../styles/Home.module.css';
import Gaguge from '../components/Gaguge';
import { useMQTT } from '../context/mqtt';

const Home: NextPage = () => {
  const { temperature } = useMQTT();
  console.log(temperature);
  return (
    <div className={styles.container}>
      <HookMqtt />
      <Gaguge value={temperature} />
    </div>
  );
};

export default Home;
