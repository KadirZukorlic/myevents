import { createContext, useState } from 'react';

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  function showNotificationHanlder(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHanlder() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHanlder,
    hideNotification: hideNotificationHanlder,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
