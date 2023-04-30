class NotificationObservable {
  observers: Function[]

  constructor() {
    this.observers = []
  }

  subscribe(func: Function) {
    this.observers.push(func)
  }

  unsubscribe(func: Function) {
    this.observers = this.observers.filter((observer) => observer !== func)
  }

  notify(data: string) {
    this.observers.forEach((observer) => observer(data))
  }
}

export default new NotificationObservable()
// 타이머 -> 옵저버 -> 데이터 전송
// 옵저버는 타이머의 상태 구독
// 타이머는 매 초마다 타이머에게 알리기
