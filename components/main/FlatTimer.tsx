import { InfoCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import RippleEffect from '../RippleEffect'
import FlatModal from './FlatModal'
import { useFlatModal } from './hooks/useFlatModal'
import { useFlatTimer } from './hooks/useFlatTimer'
import { WorkOutListItem } from './hooks/useNewWorkOutList'
import Toggle from './Toggle'

const Container = styled.div`
  color: white;
  height: 40rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 24px;

  &:hover {
    cursor: pointer;
  }
`
const Title = styled.div`
  height: 2rem;
  font-weight: 500;
  font-size: 2rem;
`
const TimerWrapper = styled.div`
  display: flex;
  margin-top: 12px;
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
  min-height: 8rem;
  & div {
    line-height: 1.5rem;
  }
`
const Item = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const ItemInput = styled.input`
  max-width: 120px;
`

const FlatTimer = () => {
  const {
    timerState,
    setTimerState,
    toggleTimerState,
    timerMode,
    toggleTimerMode,
    showMode,
    toggleShowMode,
    time,
    secondTime,
    normalRemainTime,
    T1Ref,
    T2Ref,
    constTime,
    setConstTime,
    constSecondTime,
    setConstSecondTime,
    onTimerChange,
    selectedItem,
  } = useFlatTimer()

  const { open: infoOpen, setOpen: setInfoOpen } = useFlatModal()
  const { open: timerSettingOpen, setOpen: setTimerSettingSetOpen } =
    useFlatModal()

  return (
    <Container
      onClick={toggleTimerState}
      onDoubleClick={() => {
        setTimerState('stop')
        setTimerSettingSetOpen(true)
      }}
    >
      <RippleEffect>
        <Title>{selectedItem?.title}</Title>

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
            <InfoCircleOutlined onClick={() => setInfoOpen(true)} />
          </IconContainer>
        </TimerWrapper>

        <FlatModal
          open={timerSettingOpen}
          setOpen={setTimerSettingSetOpen}
          header={'타이머 설정'}
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
            <Item>
              <div>타이머1 시간 설정</div>
              <ItemInput
                ref={T1Ref}
                defaultValue={constTime}
                type={'text'}
                maxLength={5}
                pattern="\d*"
                onChange={(e) => onTimerChange('single')}
              />
            </Item>
            {timerMode === 'double' ? (
              <Item>
                <div>타이머2 시간 설정, 모드가 더블일 경우</div>
                <ItemInput
                  ref={T2Ref}
                  defaultValue={constSecondTime}
                  type={'text'}
                  maxLength={5}
                  pattern="\d*"
                  onChange={(e) => onTimerChange('double')}
                />
              </Item>
            ) : null}
          </InfoModal>
        </FlatModal>

        <FlatModal
          open={infoOpen}
          setOpen={setInfoOpen}
          header={'타이머 설명'}
        >
          <InfoModal>
            <div>싱글 타이머: 일반적인 타이머</div>
            <div>더블 타이머: 두개의 타이머</div>
            <div>왼쪽 클릭: 타이머 시작, 정지</div>
            <div>더블 클릭: 타이머 설정</div>
          </InfoModal>
        </FlatModal>
      </RippleEffect>
    </Container>
  )
}

export default FlatTimer
