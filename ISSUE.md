# 개발하면서 겪은 이슈

## FOUC (Flash of Unstyled Content)

개발을 하고 배포를 한 뒤 개발 서버가 아닌 배포된 url로 접속했을 때 기본 스타일의 글자와 버튼들이 아주 잠깐 보였다가 원래 스타일로 돌아가는 현상이 발견됬다.
찾아보니 FOUC라는 현상이고 페이지의 스타일의 정보가 없어 잠시 스타일이 적용되지않는 페이지가 나타나는 현상이라고 한다.
주로 CSS in JS를 사용한 SSR 시에 발생한다고 한다. 왜냐? SSR방식은 html랜더링이 클라이언트에게 보내지기전에 미리 수행되고 보내짐. 하지만 CSS in JS 방식은 스타일정보가 JS안에 있기떄문에 스타일 없는 쌩 html이 랜더링 되고 JS 로드 후 스타일이 그려져 깜빡거리는 것이다.

이걸 해결하기 위한 방법은 Next.js 12버전 기준으로 나뉩니다.
차이는 바벨 플러그인 설정 차이입니당.
12버전 이후로는 swc를 통해 js 번들을 컴파일하고 babel 설정 없이 next.config.js만 건드려줍니다

next.config.js

```javascript
  compiler: {
    styledComponents: true, // fouc
  },
```

이후 custom Document 를 정의한 뒤, getInitialProps 에서 각각의 페이지에 들어갈 `<head>` 태그에
SSR 에서 반영되어야 할 styled-component 정보를 주입합니다.
<br/>
\_document.tsx

```javascript
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```

[코드출처]("https://github.com/vercel/next.js/blob/canary/examples/with-styled-components-babel/pages/_document.tsx")

## re-render

먼저 랜더링의 동작은 부모 컴포넌트 -> 자식 컴포넌트 순으로 순차적으로 랜더링된다. 즉 부모 컴포넌트를 랜더링, 리랜더링시키면 자식 컴포넌트도 필연적으로 랜더링, 리랜더링이된다.

컴포넌트의 데이터관리는 데이터가 사용되는 최소한의 레벨의 컴포넌트 트리에서 관리를 하면 좋겠다고 생각함. 그래야 최소한의 리랜더링이 일어날테니까.

그러므로 달력 데이터는 달력에서만 사용하므로 자식 컴포넌트에서 CalenderMaker class를 호출함

**[문제발생]** 다음 달, 이전 달의 데이터가 변경되지 않음.

**[원인]** CalenderMaker의 데이터가 변경이되면서 리랜더링이 발생함 -> 또 다시 CalederMaker 호출 다시 이번 달 데이터 리턴 -> ... 반복 -> 달력데이터가 변경되지 않음.

**[해결]** 상위 컴포넌트에서 CalenderMaker를 호출하여 하위 컴포넌트에게 prop로 전달하여 하위 컴포넌트에서 리랜더링이 발생하더라도 CalenderMaker는 다시 호출하지않게 함.

## UI와 로직의 분리에 대해서

ui와 로직을 분리하면 테스트, 유지보수 등 관리하기 좋다는데 나는 왜 체감을 못 하는걸까. <br>
테스트 도구 같은 것을 사용해서 테스트를 사용하지않아서일까? 그럴수도있겠다.

유지보수에서 어려움을 겪는 것같다. ui와 로직을 custom hooks로 분리하는 것은 알겠다. 말은 굉장히 간단한 것같다. 복잡하다.

먼저 re-render 이슈랑 비슷한거같은데 생각해보자. <br>
부모 컴포넌트가 하나 있고, 그 안에 컴포넌트가 둘있다. <br>
자식 컴포넌트 1과 다른 자식 컴포넌트2가 서로 값을 공유할 땐 쉽다. 최소공통조상의 레벨이 1이기 때문에 부모 컴포넌트에서 props를 내려주면 해결이다.<br>
그리고 자식 컴포넌트1 중 하나가 복잡한 컴포넌트라서 내부 컴포넌트 depth가 높고 그 위치에서 또 다른 자식 컴포넌트2와 값을 공유한다고할 때는 최소공통조상의 레벨이 높기때문에 props로 내려주기에는 너무 번거롭다. 즉 props drilling이 발생한다. 이때는 컴포넌트합성을 하면된다.
하지만 값을 공유하는 컴포넌트가 많다면 props내려주기, 컴포넌트합성으로는 어렵다. 이때 전역상태관리 라이브러리를 사용해서 값을 관리하고 필요할 때 해당 컴포넌트에서 사용한다.

쓰다보니 생각의 정리가 된것같다. 컴포넌트 하나를 만들때도 oop적인 생각을 하면 좋을 것같다. 똑같은것같기도...

## cannot assign to read only property 'numtime' of object '#<workoutlistitem>'

현재 선택된 아이템이 있고, 타이머가 흐르면 현재 선택된 아이템의 타이머도 증가하는 즉, 누적 시간을 표시하는 기능을 개발하려고 서버에서 목록들을 받아왔다. 서버에서오는데이터와 사용하는 데이터의 양식과 조금 달라서 클래스로 객체를 만들어 양식을 변형시켜주면 되겠다! 라고 생각해서 아래 클래스를 만들었다.

```typescript
// 서버데아터
interface IWorkOurListItem {
  id: number
  title: string
  set: number
  time: number
}

// 구현한 클래스
class WorkOutListItem {
  id: number
  title: string
  set: number
  _timeNum: number
  time: string

  constructor({ id, title, set, time }) {
    this.id = id
    this.title = title
    this.set = set
    this._timeNum = time
    this.time = this._convertTime(time)
  }

  _convertTime = (num: number) => {
    const hours = Math.floor(num / 3600)
    const mins = Math.floor((num % 3600) / 60)
    const sec = Math.floor((num % 3600) % 60)
    const h = hours >= 10 ? hours : `0${hours}`
    const m = mins >= 10 ? mins : `0${mins}`
    const s = sec >= 10 ? sec : `0${sec}`
    return `${h}:${m}:${s}`
  }
  countUp() {
    const sum = _sumOne(this._timeNum)
    this._timeNum = sum
    this.time = this._convertTime(sum)
  }
  _sumOne(num: number) {
    return num + 1
  }
}
```

이렇게 구현을 하고 각 객체를 배열안에 넣어 recoil로 setState 시켜 타이머도 접근할 수 있고, 목록도 표시할 수 있도록했다.
타이머도 접근할 수 있고, 목록도 표시할 수 있었지만 목표하던 기능인 누적시간표시에서 에러가 발생했다.
타이머에서 시간이 증가할때 선택된 객체를 복사하고 countUp 메소드를 실행시켜 객체의 시간을 증가시키고 다시 목록에 넣어 기능을 구현하려했지만 멤버변수가 readonly로 설정되어 변경할 수 없다는 에러가 발생했다.
[검색1](https://velog.io/@rkio/React-TypeError-Cannot-assign-to-read-only-property-0-of-object-object-Array) 결과 전역상태관리 라이브러리의 상태들은 setState되면 readonly처리 되어있고, 변경하기위해서는 깊은복사를 하여 수정해야한다는 것이다.
그래서 스프래드 연산자, map 메소드, slice + map 메소드를 사용해서 복사를 하고 객체 수정을 해보려했지만 여전히 에러가 발생하고 있어서 더 읽어보니 중첩된 객체는 깊은 복사가 되지않아서 에러가 생기는 것이였다. 해결하려고 새로운 객체를 생성하고 변경되는 값을 넣어주고 새로운 배열을 만들어서 setState를 했지만 여전히 에러가 발생해서 class를 인터페이스로 걷어내고 메소드는 따로 함수로 분리를 하여 해결를 했습니다.

```typescript
// 클래스 -> 인터페이스
interface WorkOutListItem {
  id: number
  title: string
  set: number
  timeNum: number
  time: string
}
// 클래스메소드 -> hook로 분리
const _updateList = () => {
  const itemIndex = list.findIndex((ele) => ele.id === selectedItem?.id)
  if (itemIndex !== -1) {
    const newList = list.map((item, index) => {
      if (itemIndex === index) {
        const newObj: WorkOutListItem = {
          timeNum: item.timeNum + 1,
          time: convertTimer(item.timeNum + 1),
          id: item.id,
          title: item.title,
          set: item.set,
        }
        return newObj
      }
      return item
    })

    setList(newList)
  }
}
```

## useEffect와 setInterval

타이머에 문제가 없는 줄 알았다. 클릭하면 카운트 다운하고, 더블클릭하면 멈추고, 남은시간 타이틀에 표시해주는 것까지 완벽했다.

[문제 발생] <br>
브라우저의 현재 탭이 workout이 아닌 다른 탭이였을 경우 타이머가 매우 느리게 감소한다는 것이였다.(남은시간이 타이틀에 표시됨)

[원인 추측] <br>

1. react나 nextjs가 다른탭으로 이동시 자체적인 최적화를 진행해서 느려진다.
2. 브라우저가 현재 탭이 아닌 다른 탭들에게 리소스를 조금줘서 어쩔 수 없이 느려지는 것이다.
3. 내 코드잘못

[시도] <br>

1. 아무리 검색해봐도 react나 nextjs가 다른탭으로 이동시 자체적인 최적화를 한다는 글이나 포스트가 없음.
2. 검색 방법을 모르겠음... 브라우저 탭에 관해서 알고있는 것은 탭은 독립적인 공간, 일정 시간이지나면 비활성화 됨뿐 이여서 문제를 다른관점으로 해결하려고 시도했다.
   1. window에게 브라우저 이탈 이벤트가 발생하면 로컬스토리지에 현재 시간을 저장시키고, 다시 돌아오는 이벤트가 발생했을 경우 현재시간과 로컬스토리지에 저장된 시간을 비교해서 그만큼 타이머에 빼준다. -> 탭이동 말고 브라우저 이탈 이벤트(focusout)은 자주 발생할 수 있기에 타이머의 시간이 옳바른 시간임을 보장할 수 없어서 제외.
   2. 기능 제거 -> 구현하지말까 생각도해봤지만 아직 3. 내 코드잘못이라는 경우의 수가 있기때문에 보류.
3. 내 코드가 잘못되었을까봐 == 비효율적이여서 느려졌을까봐 다시한번 확인해보고 구글링을 해본결과. 내 코드가 잘못되었었다.

[원인] <br>
내 코드 잘못..ㅋㅋ <br>
[검색1 유튜브](https://www.youtube.com/watch?v=2tUdyY5uBSw) <br>
[검색2 설명](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
useEffect안에 setInterval, clearInterval을 작성해서 구현을 했다. 이렇게 구현을 한것이 검색2의 첫번째 시도에 정확히 똑같이 예제가 있엇다.

### 내용 추가

내가 비효율적인 코드를 작성한 것도 맞지만 더 정확한 원인은 브라우저에 있었다!
코드를 수정해도 그대로 느리게 감소하는 현상이 발견되어서 인터넷을 정말 많이 찾아보았다. 역시 답은 mdn. <br/>
[mdn setTimeout]("https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#reasons_for_delays_longer_than_specified")

이 문제를 해결하기 위해서는 웹 워커를 사용해야한다..!
ts는 컴파일 에러가 뜨기때문에 js로 구현하였다.
웹 워커의 역할은 메시지가 오면 setTimeout으로 1초 뒤에 메시지를 다시 보내는 것!
웹 워커에게 메시지를 받으면 \_countdown 함수를 실행시킨다!

workers/flatTimerSetTimeout.js

```javascript
// onmessage: 메세지를 받으면 동작 이벤트리스너와 똑같이 동작함.
// ex) addEventListener('message', () => {})

onmessage = (e) => {
  let delay = e.data
  let timer = setTimeout(() => {
    postMessage('웹워커 -> 타이머')
    clearTimeout(timer)
  }, delay)
}
```

timer.ts

```typescript
// 기존: 위에서 구현한 useInterval
useInterval(() => {
  if (timerState === 'running') {
    _countDown()
  }
}, 1000)

// 변경: 웹 워커가 대신 setTimeout함
useEffect(() => {
  const worker = new Worker(
    new URL('../../../workers/flatTimerSetTimeout.js', import.meta.url),
  )
  worker.postMessage(1000)
  worker.onmessage = (e) => {
    if (timerState === 'running') {
      _countDown()
    }
  }
  return () => worker.terminate()
})
```

## 크로스 브라우징 관련

### new Date, 사파리, 크롬

개발하다가 아이폰으로 테스트 중 자꾸 화면이 아무것도 안떠서 맥북에 연결해 에러를 확인해보니 (yyyy mm dd)형태로 new Date에 넣어주니 Invalid Date라는 에러가 확인되었다. 확인해보니 사파리에서는(yyyy mm dd)형태가 아닌 (yyyy/mm/dd)형태로 중간에 슬래쉬를 넣어주거나 (yyyy/mm/dd H:i:s)형태로 넣어주면 된다는 것이였다.
