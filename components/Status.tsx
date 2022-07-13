import React, { useEffect, useState } from 'react'
import { useMqttState, useSubscription } from 'mqtt-react-hooks'
import { useMQTT } from '../context/mqtt'
import Chart from './Chart'
import useFetch from '../hooks/useFetch'
import ReactDatePicker from 'react-datepicker'
import Modal from './Modal'
import classNames from 'classnames'

export interface Sensor {
  createat: Date
  temperature: number
  humidity: number
  id: number
}

const dt = new Date()
dt.setHours(dt.getHours() - 24)

const Status = () => {
  // const [temperature, setTemperature] = useState(0)

  const [isCustom, setIsCustom] = useState(false)
  const [modalState, setModalState] = useState(false)
  const [ranges, setRanges] = useState({
    Tmax: 22,
    Tmin: 20,
    Hmax: 60,
    Hmin: 40
  })

  const [startDate, setStartDate] = useState<Date>(dt)
  const [endDate, setEndDate] = useState<Date>(new Date())
  const { message } = useSubscription([
    'topic_sensor_temperature',
    'topic_sensor_humidity'
  ])
  const { setTemp, temperature, setHumidity, humidity } = useMQTT()

  const url = `http://192.168.0.6:3000/sensors?startDate=${startDate
    .toISOString()
    .split('.')[0]
    .replace('T', ' ')}&endDate=${endDate
      .toISOString()
      .split('.')[0]
      .replace('T', ' ')}`

  const { data, error } = useFetch<Sensor[]>(url)

  useEffect(() => {
    if (message?.topic === 'topic_sensor_temperature') {
      console.log(message)
      setTemp(Number(message.message))
      // setMessages((messages) => [...messages, payload]);
    } else if (message?.topic === 'topic_sensor_humidity') {
      setHumidity(Number(message.message))
    }
  }, [message])

  const toggleModal = () => setModalState(!modalState)
  const onChangeHandler = (e) =>
    setRanges({ ...ranges, [e.target.name]: e.target.value })

  return (
    <div className="container is-fluid section">
      <div className="columns">
        <div className="column is-three-quarters" style={{ height: 600 }}>
          <Chart data={data} />
        </div>
        <div className="column is-one-quarter">
          <div className="box date-filter">
            <div className="box">
              {!isCustom && (
                <>
                  <label htmlFor="from">From:</label>
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    showTimeInput
                    timeIntervals={15}
                    dateFormat="Pp"
                    placeholderText="Start date"
                    className="input"
                    id="from"
                  />
                  <label htmlFor="since" className="mt-3">
                    Since:
                  </label>
                  <ReactDatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    showTimeInput
                    timeIntervals={15}
                    dateFormat="Pp"
                    placeholderText="End date"
                    className="input"
                    id="since"
                  />
                </>
              )}
            </div>
          </div>
          <div className="box">
            <span className="has-text-centered">Temperature:</span>
            <span
              onClick={toggleModal}
              className={classNames('input  is-rounded', {
                'has-text-warning': temperature > ranges.Tmax
              })}>
              {`${temperature} C°`}
            </span>
            Humidity:
            <span
              className={classNames('input  is-rounded', {
                'has-text-warning': humidity > ranges.Hmax
              })}>{`${humidity} %`}</span>
          </div>
        </div>
      </div>
      <Modal closeModal={toggleModal} modalState={modalState} title="settings">
        MaxTemperature:
        <input
          type="text"
          className="input"
          name="Tmax"
          value={ranges.Tmax}
          onChange={onChangeHandler}
        />
        MinTemperature:
        <input type="text" className="input" />
      </Modal>
    </div>
  )
}



export default Status
