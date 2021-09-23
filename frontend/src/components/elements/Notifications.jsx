import React from 'react';
import Snackbar from '@mui/material/Snackbar';

import { useNotificationStore } from '@/stores/notifications';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <div>
      {notifications.map((notification) => (
        <Snackbar
          open
          key={notification.id}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={(_, reason) => {
            if (reason !== 'clickaway') dismissNotification(notification.id);
          }}
          message={notification.message}
        />
      ))}
    </div>
  );
};

export default Notifications;
