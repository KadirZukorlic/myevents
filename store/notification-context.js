import { createContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        hideNotificationHanlder();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

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
