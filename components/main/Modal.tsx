import React, { ReactNode, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const modalShow = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`

const Container = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  animation: ${modalShow} 0.3s;

  & button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
`

const Section = styled.section`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  min-height: fit-content;
  height: auto;
  border-radius: 4px;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  /* overflow: hidden; */
`
const Header = styled.header`
  position: relative;
  padding: 16px 64px 12px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
  min-height: 46px;

  & button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
`

const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;
  & button {
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
  }
`

interface IModal {
  open: boolean
  setOpen: Function
  children: ReactNode
  header?: string
}

const Modal = ({ open, setOpen, children, header }: IModal) => {
  return (
    <Container open={open}>
      {open ? (
        <Section>
          {header ? (
            <Header>
              {header}
              <button
                className="close"
                onClick={() => setOpen(false)}
              >
                &times;
              </button>
            </Header>
          ) : null}
          {children}

          <Footer>
            <button
              className="close"
              onClick={() => setOpen(false)}
            >
              close
            </button>
          </Footer>
        </Section>
      ) : null}
    </Container>
  )
}

export default Modal
