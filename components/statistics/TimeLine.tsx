import React from 'react'
import styled from 'styled-components'
import { ITimeLine } from '../../interface'

const TimeLine = ({ selectedDate }: ITimeLine) => {
  return (
    <Container>
      <Title>타임라인</Title>

      {selectedDate.data!.map(
        (timeZone, i) =>
          timeZone.length > 0 && (
            <div key={i}>
              <TimeZone>
                <div>{`${i} : 00 ~ ${i + 1} : 00`}</div>
              </TimeZone>
              {timeZone.map((obj, i) => (
                <Item key={i}>
                  <ItemLeftTime>{obj.showTime}</ItemLeftTime>
                  <ItemContent>
                    <TieContainer>
                      <Tie />
                    </TieContainer>
                    <ContentContainer>
                      <Content>
                        <ContentTitle>{obj.title || '타이머'}</ContentTitle>
                        <ContentType>{obj.type}</ContentType>
                        <ContentTime>{obj.time}</ContentTime>
                      </Content>
                    </ContentContainer>
                  </ItemContent>
                </Item>
              ))}
            </div>
          ),
      )}
    </Container>
  )
}

export default TimeLine

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--header-bg);
  margin-bottom: 1rem;
  border-radius: 4px;
  padding: 12px;
  color: var(--text-color);
`
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 2.5rem;
  }
`
const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  margin-bottom: 12px;

  @media ${(props) => props.theme.breakPoint.mobile} {
    height: 7rem;
  }
`
const ItemLeftTime = styled.div`
  margin-right: 4px;
  height: 100%;
  display: flex;
  justify-content: right;
  padding-top: 0.5rem;
  font-size: 14px;
  /* font-size: clamp(1.5rem, 0.5rem + 2.5vw, 1rem); */
  opacity: 0.8;
`
const ItemContent = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid;
  border-color: var(--color-btn-border-hover);
  border-radius: 2px;

  display: flex;
  align-items: center;
`
const TieContainer = styled.div`
  width: 10px;
  position: relative;
`
const Tie = styled.div`
  width: 10px;
  height: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  top: -2.5rem;
  left: 0;
  background-color: salmon;
  position: absolute;
  @media ${(props) => props.theme.breakPoint.mobile} {
    top: -3.5rem;
  }
`
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
`
const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
`
const ContentTitle = styled.div`
  font-size: 1.2rem;
  line-height: 1.5rem;
  font-weight: 500;
  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 1.6rem;
  }
`
const ContentType = styled.div`
  font-size: 0.8rem;
  line-height: 0.9rem;
  font-weight: 400;
  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 1.2rem;
  }
`
const ContentTime = styled.div`
  font-size: 0.6rem;
  line-height: 0.7rem;
  font-weight: 400;
  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 1rem;
  }
`
const TimeZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1.5rem;
  margin-bottom: 8px;
  margin-top: 4px;

  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 1.5rem;
    font-weight: 500;
  }
`
