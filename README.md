# 💪 Work Out

## 소개

자신의 운동이나 일정을 기록하고 남들과 공유하여 동기부여를 얻는 서비스 <br />
자신의 기록을 그룹원들과 공유하여 동기부여를 얻어보세요. <br />

<br />

### 특징

|     특징     |        설명         |
| :----------: | :-----------------: |
|   Next.js    |       13.0.3        |
|   상태관리   | React-Query, Recoil |
|    스타일    |  Styled-Component   |
| 데이터베이스 |      firebase       |

<br />

### 깃 커밋 메시지 컨벤션

- [feat]: 새로운 기능추가
- [bug]: 버그 수정
- [layout, style]: html, css 변경
- [refact, refactor]: 코드 리팩토링
- [doc]: .md 파일 수정

<br />

### 배포 현황

<img src="https://firebasestorage.googleapis.com/v0/b/workout-21c5f.appspot.com/o/vercel.svg?alt=media&token=011fea83-5bd4-4fcf-b14b-b36f52d94c95" width="25px" />  
<img src="https://img.shields.io/badge/배포중-00b336?style=flat" />

<img src="https://firebasestorage.googleapis.com/v0/b/workout-21c5f.appspot.com/o/android.svg?alt=media&token=6387ce48-96be-4010-9ed7-9c71c5c581cd" width="25px" />
<img src="https://img.shields.io/badge/검토중-aeaeae?style=flat" />

웹 사이트 링크: Work Out | [https://nextjs-workout.vercel.app/](https://nextjs-workout.vercel.app/) <br/>
플레이스토어 링크 : 다 모임 | 검토중. <br/>
깃허브 위키: [workout 위키](https://github.com/sangpyokim/nextjs-workout/wiki)

<br />

## 폴더 구조

📦 components <br/>
┣ 📂atoms // 각 페이지별 컴포넌트에서 재사용가능한 컴포넌트<br/>
┃ ┣ 📜Button.tsx <br/>
┃ ┣ ... <br/>
┣ 📂layout // 랩핑 컴포넌트, 레이아웃을 구성하는 관련 컴포넌트<br/>
┃ ┣ 📂hooks // 해당 폴더 컴포넌트에서 사용하는 훅<br/>
┃ ┣ 📜GoogleLogInButton.tsx <br/>
┃ ┣ ...<br/>
┣ 📂group <br/>
┃ ┣ 📂hooks <br/>
┃ ┣ 📜FormModal.tsx <br/>
┃ ┣ ...<br/>
┣ 📂main <br/>
┃ ┣ 📂hooks <br/>
┃ ┣ 📂recoil <br/>
┃ ┃ ┗ 📜TimerAtom.ts <br/>
┃ ┣ 📜FlatModal.tsx <br/>
┃ ┣ ...<br/>
┣ 📂statistics <br/>
┃ ┣ 📂hooks <br/>
┃ ┣ 📜BarChart.tsx <br/>
┗ ┣ ...<br/>
📦 recoil // atom, atom key 모음<br/>
📦 react-query // queryClient, query key 모음<br/>
📦 localstorage // 로컬스토리지 로직, key 모음<br/>
📦 firebase <br/>
┣ 📂auth <br/>
┣ 📂database <br/>
┣ 📂storage <br/>
📦 workers // 웹 워커<br/>
📦 styles <br/>
📦 utils<br/>
📜 interface.ts // 모든 인터페이스 정리<br/>

## 데이터베이스 구조

groups <br/>
┗ id <br/>
ㅤ ┣ info <br/>
ㅤ ┃ ┣ id: string <br/>
ㅤ ┃ ┣ capacity: number <br/>
ㅤ ┃ ┣ description: string <br/>
ㅤ ┃ ┣ title: string <br/>
ㅤ ┃ ┣ tag: string <br/>
ㅤ ┃ ┗ chief <br/>
ㅤ ┃ ㅤㅤ ┣ displayName: string <br/>
ㅤ ┃ ㅤㅤ ┗ email: string <br/>
ㅤ ┗ users <br/>

chats <br/>
┗ id // groupId <br/>
ㅤ ┗ chat <br/>
ㅤ ㅤ ┣ id: number // 시간 <br/>
ㅤ ㅤ ┣ content: string <br/>
ㅤ ㅤ ┣ type: string <br/>
ㅤ ㅤ ┗ writer <br/>
ㅤ ㅤ ㅤㅤ ┣ displayName: string <br/>
ㅤ ㅤ ㅤㅤ ┗ email: string <br/>

users <br/>
┗ email <br/>
ㅤ ┣ statisticss <br/>
ㅤ ┃ ┗ timeLine <br/>
ㅤ ┃ㅤ ┣ id: number <br/>
ㅤ ┃ㅤ ┣ title: string <br/>
ㅤ ┃ ㅤ┣ time: string <br/>
ㅤ ┃ ㅤ┗ type: string <br/>
ㅤ ┣ groups <br/>
ㅤ ┃ ┗ id: string <br/>
ㅤ ┣ timer <br/>
ㅤ ┃ ┗ list <br/>
ㅤ ┃ㅤ ┣ id: number <br/>
ㅤ ┃ㅤ ┣ set: string <br/>
ㅤ ┃ ㅤ┣ time: string <br/>
ㅤ ┃ ㅤ┗ time: string <br/>
ㅤ ┗ settings <br/>
ㅤ ㅤ ┗ timer <br/>
ㅤㅤㅤㅤ ┣ mode: string <br/>
ㅤㅤㅤㅤ ┣ t1: string <br/>
ㅤㅤㅤ ㅤ┣ t2: string <br/>
ㅤㅤㅤ ㅤ┗ type: string <br/>

<br/>

## 페이지별 설명

[페이지별 설명, workout 위키](https://github.com/sangpyokim/nextjs-workout/wiki/Home)
<br/>

## 테마

[테마, workout 위키](https://github.com/sangpyokim/nextjs-workout/wiki/Theme)
<br/>

## 개발하면서 참고한 글

[테마, workout 위키](https://github.com/sangpyokim/nextjs-workout/wiki/%EA%B0%9C%EB%B0%9C%ED%95%98%EB%A9%B4%EC%84%9C-%EC%B0%B8%EA%B3%A0%ED%95%9C-%EA%B8%80)
<br/>

## 개발하면서 겪은 이슈

[개발하면서 겪은 이슈, workout 위키](https://github.com/sangpyokim/nextjs-workout/wiki/%EA%B0%9C%EB%B0%9C%ED%95%98%EB%A9%B4%EC%84%9C-%EA%B2%AA%EC%9D%80-%EC%9D%B4%EC%8A%88)
<br/>
