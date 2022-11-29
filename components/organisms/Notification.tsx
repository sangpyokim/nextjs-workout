import React from 'react'
import { INotificationData } from '../../store/NotificationContext'

const Notification = ({ title, message, status }: INotificationData) => {
  if (status === false) return null

  return <div>{title}</div>
}

export default Notification
