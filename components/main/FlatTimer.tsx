import { InfoCircleOutlined, RedoOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import RippleEffect from '../layout/RippleEffect'
import FlatModal from './FlatModal'
import { useFlatModal } from './hooks/useFlatModal'
import { useFlatTimer } from './hooks/useFlatTimer'
import Toggle from './Toggle'

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
    onClickResetButton,
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
            <RedoOutlined onClick={onClickResetButton} />
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
            <InfoModalTitle>설명</InfoModalTitle>
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

const Container = styled.div`
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
  :hover {
    color: var(--color-btn-border-hover);
  }
`

const FirstRemainTime = styled.div`
  font-size: 6rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  line-height: 8rem;

  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 4.5rem;
    line-height: 6.5rem;
  }
`
const SecondRemainTime = styled.div`
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: 0.2rem;

  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 2.5rem;
    line-height: 3rem;
  }
`
const IconContainer = styled.div`
  position: relative;
  right: -1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
  font-size: 1.3rem;

  & svg {
    :hover {
      color: var(--color-btn-border-hover);
    }
  }
`
const InfoModal = styled.div`
  padding: 12px;
  font-size: ${(props) => props.theme.fontSize.font_base};
  line-height: ${(props) => props.theme.lineHeight.font_base};

  min-height: 8rem;
`
const InfoModalTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_lg};
  line-height: ${(props) => props.theme.lineHeight.font_lg};
  margin-bottom: 4px;
`
const Item = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const ItemInput = styled.input`
  max-width: 120px;
  background-color: var(--input-bg);
  color: var(--text-color);
  border: 1px solid;
  border-color: var(--border-color);
`
