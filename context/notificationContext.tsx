import React, { useState } from 'react';

interface Props {
  children: React.ReactNode
}

const NotificationContext = React.createContext({
  notification: '',
  notificationText: '',
  success: (text: string, timeout: number) => { },
  error: (text: string, timeout: number) => { },
  clear: () => { }
});

const STATES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const NotificationProvider = ({ children }: Props) => {
  const [notification, setNotification] = useState('');
  const [notificationText, setNotificationText] = useState('');

  const success = (text: string, timeout: number = 10) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.SUCCESS);
    setTimeout(() => {
      setNotification('');
    }, timeout * 1000)
  };
  const error = (text: string, timeout: number = 10) => {
    // window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.ERROR);
    setTimeout(() => {
      setNotification('');
      setNotificationText('');
    }, timeout * 1000)
  };
  const clear = () => {
    setNotification('');
  };
  return (
    <NotificationContext.Provider
      value={{
        success, error, clear, notification, notificationText,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationContext;