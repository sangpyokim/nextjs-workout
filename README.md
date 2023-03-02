# 💪 Work Out

## 소개

자신의 운동을 기록하고 남들과 공유하여 동기부여를 얻는 서비스
운동을 기록하고 남들과 공유하여 동기부여를 얻는 서비스를 개발했습니다.
React가 아닌 Next js를 선택함으로써 SSR을 할 수 있고 어떠한 상황에서 SSR과 CSR을 선택하는 것 또한 배우게되었습니다.

**특징**

|     특징     |        설명         |
| :----------: | :-----------------: |
|   Next.js    |       13.0.3        |
|   상태관리   | React-Query, Recoil |
|    스타일    |  Styled-Component   |
| 데이터베이스 |      firebase       |

**깃 커밋 메시지 컨벤션**

- [feat]: 새로운 기능추가
- [bug]: 버그 수정
- [layout, style]: html, css 변경
- [refact, refactor]: 코드 리팩토링
- [doc]: .md 파일 수정

웹사이트: Work Out. [https://nextjs-workout.vercel.app/](https://nextjs-workout.vercel.app/)

<br />

## **페이지**

### **1. 홈 페이지**

- 일반적인 타이머와 쉬는시간 등 텀을 두기위한 더블 타이머.
- 오늘 운동이나 할일들을 등록할 수 있으며 오늘 누적된 시간 표시.

<br />

### **2. 통계 페이지**

- 타이머와 할일들의 통계를 날짜별로 확인 할 수 있음.

<br />

### **3. 내 그룹 페이지**

- 현재 내가 참여하고있는 그룹들을 표시.

<br />

### **4. 그룹들 페이지**

- 사용자들의 모든 그룹들을 간략하게 표시하고, 그룹에 참여할 수 있음.

<br />

### **5. 그룹상세 페이지**

- 그룹에 참여하고 있는 사용자들을 확인 할 수 있음.
- 다른 사용자의 통계를 확인할 수 있음.

<br />

## **페이지별 상세 기능**

### **1. 홈 페이지**

- 타이머
  - [x] 클릭 시 타이머 시작, 정지
  - [x] 더블 클릭 시 타이머 설정
  - [x] 싱글 타이머 / 더블 타이머 설정
  - [x] 타이머 시간 설정
  - [x] 타이머 설정 localstorage에 저장, 없을 경우 서버에서 로드
  - [x] 타이머 끝났을 경우 클릭 시 재시작
  - [x] 초기 상태로 리셋
- 할일
  - [x] 오늘 할일 목록 생성
  - [x] 오늘 운동 목록 서버에 저장/불러오기
  - [x] 클릭시 현재 할일 포커스
  - [x] 포커스된 할일 타이머가 진행중이면 누적 시간 증가
  - [x] 할일 삭제, 수정

<br />

### **2. 통계 페이지**

- 달력
  - [x] 오늘 날짜 표시
  - [x] 오늘 날짜 달력에 하이라이트
  - [x] 할일 달력에 표시
  - [x] 이전달, 다음달 넘어가기
- 타임라인
  - [x] 달력을 통해 선택된 날짜에 해당하는 타이머 사용내용 시간대별 표시

<br />

### **3. 내 그룹 페이지**

- 내 그룹
  - [x] 현재 활동하고있는 그룹 간략히 표시
  - [x] 클릭시 그룹 상세보기 페이지로 이동

<br />

### **4. 그룹들 페이지**

- 그룹들
  - [x] 현재 만들어져있는 그룹들 간략히 표시
  - [x] 클릭 시 그룹 상세보기 모달창
  - [x] 그룹만들기 클릭 시 그룹만들기 모달창

<br />

### **5. 그룹상세 페이지**

- 그룹들
  - [x] 내 그룹에서 그룹 클릭 시 그룹상세페이지로 이동
  - [x] 그룹에 참가한 멤버들 표시
  - [x] 멤버들 중 오늘 사용내역이 있다면 하이라이트
  - [ ] 채팅 기능

### **6. 로그인, 회원가입 모달**

- 로그인
  - [x] 정규표현식 사용하여 아이디, 비밀번호 유효성 검사
- 회원가입
  - [x] 닉네임, 아이디, 비밀번호 유효성 검사

<br />
<br />

# 개발하면서 참고한 글

## 링크

### [React 리랜더링에 관하여](https://yceffort.kr/2022/04/deep-dive-in-react-rendering)

## 반응형 CSS

### [2023년 이후의 반응형 디자인 가이드](https://ishadeed.com/article/responsive-design/)

### [Defensive CSS](https://defensivecss.dev/)

### [새로운 반응형 CSS](https://web.dev/new-responsive/)

### [CSS 기초 및 원칙](https://buildexcellentwebsit.es/)

## useHooks

### [setInterval대신 사용할 useInterval](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

## SSR

### [nextJS에서 react query로 SSR적용하기](https://velog.io/@devgosunman/react-query-ssr-%EC%A0%81%EC%9A%A9-nextjs)

<br />
<br />

# 개발하면서 겪은 이슈

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

## 크로스 브라우징 관련

### new Date, 사파리, 크롬

개발하다가 아이폰으로 테스트 중 자꾸 화면이 아무것도 안떠서 맥북에 연결해 에러를 확인해보니 (yyyy mm dd)형태로 new Date에 넣어주니 Invalid Date라는 에러가 확인되었다. 확인해보니 사파리에서는(yyyy mm dd)형태가 아닌 (yyyy/mm/dd)형태로 중간에 슬래쉬를 넣어주거나 (yyyy/mm/dd H:i:s)형태로 넣어주면 된다는 것이였다.
