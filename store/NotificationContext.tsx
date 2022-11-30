import React, { createContext, ReactNode, useState } from 'react'

interface INotificationContextProvider {
  children: ReactNode
}

const NotificationContext = createContext({
  notification: {},
  showNotification: (notificationData: INotificationData) => {},
  hideNotification: () => {},
})

export interface INotificationData {
  title: string
  message: string
  status: boolean
}

export const NotificationContextProvider = ({
  children,
}: INotificationContextProvider) => {
  const [activeNotification, setActiveNotification] =
    useState<INotificationData>({
      title: '',
      message: '',
      status: false,
    })

  const showNotification = (notificationData: INotificationData) => {
    setActiveNotification(notificationData)
  }
  const hideNotification = () => {
    setActiveNotification({
      title: '',
      message: '',
      status: false,
    })
  }

  const context = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
