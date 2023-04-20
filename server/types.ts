export interface IToken {
  token: string
  expireDate: string // yyyy/mm/dd/hh/mm
}

export interface INotification {
  title: string
  body: string
  url?: any
}
