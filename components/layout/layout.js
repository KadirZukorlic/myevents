import React, { Fragment, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';
import { MainHeader } from './main-header';

export const Layout = (props) => {
  const notificatoinCtx = useContext(NotificationContext);

  const activeNotification = notificatoinCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};
