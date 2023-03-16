import React from 'react'
import styled from 'styled-components'

const CalenderSkeleton = () => {
  return (
    <Grid>
      {Array.from({ length: 5 }, () => new Array(7).fill(false)).map(
        (arr, i) => (
          <Rows key={i}>
            {arr.map((item, j) => (
              <Item key={j}>
                <ItemDate isToday={item.isToday}>{i * 7 + j + 1}</ItemDate>
              </Item>
            ))}
          </Rows>
        ),
      )}
    </Grid>
  )
}

export default CalenderSkeleton

const Grid = styled.div`
  color: white;
  width: 100%;
  display: grid;
  grid-template-rows: auto;
`
const Rows = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`
const Item = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.gray_white};
  border: 1px solid ${(props) => props.theme.colors.gray};

  @media ${(props) => props.theme.breakPoint.mobile} {
    height: 4rem;
  }
`

const ItemDate = styled.div<{ isToday: boolean }>`
  color: ${(props) => (props.isToday ? 'black' : '')};
  background-color: ${(props) => (props.isToday ? 'var(--text-color)' : '')};
  padding: 0px 4px;
  border-radius: 2px;
`
