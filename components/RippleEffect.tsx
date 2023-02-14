import React, { ReactNode, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const ripple = keyframes`
  to {
    transform: scale(300);
    opacity: 0;
    overflow: hidden;
  }
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`
const RippleNode = styled.span<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;

  background-color: white;
  opacity: 0.3;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  overflow: hidden;
  animation: ${ripple} 0.5s ease-in-out;
`

interface IRippleEffect {
  children: ReactNode
}

const RippleEffect = ({ children }: IRippleEffect) => {
  const [node, setNode] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setNode(true)
    const rippleContainer = e.currentTarget.getBoundingClientRect()

    const x = e.pageX - rippleContainer.x
    const y = e.pageY - rippleContainer.y

    ref.current!.style.top = String(y) + 'px'
    ref.current!.style.left = String(x) + 'px'

    setTimeout(() => {
      setNode(false)
    }, 500)
  }

  return (
    <Container onClick={(e) => clickHandler(e)}>
      <RippleNode
        show={node}
        ref={ref}
      />

      {children}
    </Container>
  )
}

export default RippleEffect
