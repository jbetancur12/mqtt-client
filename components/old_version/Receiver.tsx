import React, { useEffect, useState } from 'react'
import { Card, List } from 'antd'
import { useMQTT } from '../context/mqtt'

const Receiver = ({ payload }: any) => {
  const [messages, setMessages] = useState([])
  const { setTemp } = useMQTT()

  useEffect(() => {
    if (payload.topic) {
      setTemp(parseFloat(payload.message))
      setMessages((messages) => [...messages, payload])
    }
  }, [payload])

  const renderListItem = (item: any) => (
    <List.Item>
      <List.Item.Meta title={item.topic} description={item.message} />
    </List.Item>
  )

  return (
    <Card title="Receiver">
      {/* <List
        size='small'
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      /> */}
    </Card>
  )
}

export default Receiver
