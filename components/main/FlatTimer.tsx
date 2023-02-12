import { InfoCircleOutlined, SettingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import FlatModal from './FlatModal'
import { useFlatModal } from './hooks/useFlatModal'
import { useFlatTimer } from './hooks/useFlatTimer'
import Toggle from './Toggle'

const Container = styled.div`
  color: white;
  height: 40rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: red;
`
const TimerWrapper = styled.div`
  display: flex;
`
const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FirstRemainTime = styled.div`
  font-size: 8rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  line-height: 9rem;
`
const SecondRemainTime = styled.div`
  font-size: 4rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
`
const IconContainer = styled.div`
  position: relative;
  right: -1rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
  font-size: 1.3rem;
`
const InfoModal = styled.div`
  color: black;
  padding: 12px;
  font-size: 1rem;

  & div {
    line-height: 1.5rem;
  }
`
const Item = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const FlatTimer = () => {
  const {
    timerState,
    timerMode,
    toggleTimerMode,
    showMode,
    time,
    secondTime,
    normalRemainTime,
    toggleShowMode,
    toggleTimerState,
  } = useFlatTimer()
  const { open: infoOpen, setOpen: setInfoOpen } = useFlatModal()
  const { open: timerSettingOpen, setOpen: setTimerSettingSetOpen } =
    useFlatModal()
  const { open: toggleOpen, setOpen: setToggleOpen } = useFlatModal()
  const { open: toggleOpen2, setOpen: setToggleOpen2 } = useFlatModal()

  return (
    <Container onClick={toggleTimerState}>
      <TimerWrapper>
        {showMode === 'normal' ? (
          <TimerContainer>
            <FirstRemainTime>{normalRemainTime.first}</FirstRemainTime>
            {timerMode === 'double' ? (
              <SecondRemainTime>{normalRemainTime.second}</SecondRemainTime>
            ) : null}
          </TimerContainer>
        ) : (
          <TimerContainer>
            <FirstRemainTime>{time}</FirstRemainTime>
            {timerMode === 'double' ? (
              <SecondRemainTime>{secondTime}</SecondRemainTime>
            ) : null}
          </TimerContainer>
        )}
        <IconContainer onClick={(e) => e.stopPropagation()}>
          <InfoCircleOutlined onClick={() => setTimerSettingSetOpen(true)} />
        </IconContainer>
      </TimerWrapper>

      <FlatModal
        open={infoOpen}
        setOpen={setInfoOpen}
        header={'타이머 설명'}
      >
        <InfoModal>
          <div>왼쪽 클릭: 타이머 시작, 정지</div>
          <div>오른쪽 클릭: 타이머 설정</div>
        </InfoModal>
      </FlatModal>

      <FlatModal
        open={timerSettingOpen}
        setOpen={setTimerSettingSetOpen}
        header={'타이머 설명'}
      >
        <InfoModal>
          <Item>
            <div>타이머 모드 ( 싱글 | 더블 )</div>
            <Toggle
              open={timerMode}
              setOpen={toggleTimerMode}
            />
          </Item>
          <Item>
            <div>타이머 시간 표기 ( 일반 | 초 )</div>
            <Toggle
              open={showMode}
              setOpen={toggleShowMode}
            />
          </Item>
          <Item>타이머1 시간 설정</Item>
          <Item>타이머2 시간 설정, 모드가 더블일 경우</Item>
        </InfoModal>
      </FlatModal>
    </Container>
  )
}

export default FlatTimer
