import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Connector } from 'mqtt-react-hooks'
import { IClientOptions } from 'mqtt'
import Status from '../components/Status'

type CustomPage = NextPage & {
  requiresAuth?: boolean;
  redirectUnauthenticatedTo?: string;
};




const Home: CustomPage = (): JSX.Element => {
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
      retain: false
    },
    rejectUnauthorized: false
  }

  return (
    <div className={styles.container}>
      <Connector
        brokerUrl="ws://rf09deee.us-east-1.emqx.cloud:8083/mqtt"
        options={options}>
        <Status />
      </Connector>
    </div>
  )
}

Home.requiresAuth = true;
Home.redirectUnauthenticated = "/login";

export default Home
