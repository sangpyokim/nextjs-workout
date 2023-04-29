import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'

export interface IToken {
  token: string
  expireDate: string // yyyy/mm/dd/hh/mm
}

export interface INotification {
  title: string
  body: string
  url?: any
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
export interface Chat {
  content: string
  id: string
  status: string // show, block
  type: string // text, image, ...
  displayName: string
  email: string
}
