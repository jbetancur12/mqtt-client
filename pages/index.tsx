import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import HookMqtt from '../components';
import styles from '../styles/Home.module.css';
import Gaguge from '../components/Gaguge';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <HookMqtt />
      <Gaguge value={23} />
    </div>
  );
};

export default Home;
