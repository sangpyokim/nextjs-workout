import React, { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

interface IModal {
  open: boolean
  setOpen: Function
  children: ReactNode
  header?: string
  onSubmit?: Function
  getFooter?: boolean
}

const FlatModal = ({
  open,
  setOpen,
  children,
  header,
  onSubmit,
  getFooter = true,
}: IModal) => {
  return (
    <Container
      open={open}
      onClick={(e) => {
        e.stopPropagation()

        const response = window.confirm('정말 닫으시겠습니까?')
        if (response) setOpen()
      }}
    >
      {open ? (
        <Section onClick={(e) => e.stopPropagation()}>
          {header ? (
            <Header>
              {header}
              <button
                className="close"
                onClick={() => {
                  const response = window.confirm('정말 닫으시겠습니까?')
                  if (response) setOpen()
                }}
              >
                &times;
              </button>
            </Header>
          ) : null}

          {children}

          {getFooter && (
            <Footer>
              {onSubmit ? (
                <button
                  className="submit"
                  onClick={() => {
                    const response = window.confirm('제출 하시겠습니까?')
                    if (response) onSubmit()
                  }}
                >
                  완료
                </button>
              ) : (
                <button
                  className="close"
                  onClick={() => {
                    setOpen()
                  }}
                >
                  close
                </button>
              )}
            </Footer>
          )}
        </Section>
      ) : null}
    </Container>
  )
}

export default FlatModal

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

  font-size: ${(props) => props.theme.fontSize.font_lg};
  line-height: ${(props) => props.theme.lineHeight.font_lg};

  & button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
`

const Section = styled.div`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  min-height: fit-content;
  height: auto;
  border-radius: 2px;
  background-color: var(--background-color);
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  /* overflow: hidden; */
`
const Header = styled.header`
  position: relative;
  padding: 16px 64px 12px 16px;
  /* background-color: #; */
  font-weight: 700;
  min-height: 46px;
  border-bottom: 1px solid;
  border-color: var(--border-color);
  color: var(--text-color);

  & button {
    position: absolute;
    top: 13px;
    right: 15px;
    width: 30px;
    font-size: ${(props) => props.theme.fontSize.font_lg};
    line-height: ${(props) => props.theme.lineHeight.font_lg};

    font-weight: 700;
    text-align: center;
    color: var(--text-color);
    background-color: transparent;
  }
`

const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;
  & button {
    padding: 2px 10px;
    color: var(--text-color);
    background-color: var(--button-bg);
    border-radius: 2px;
    font-size: ${(props) => props.theme.fontSize.font_base};
    line-height: ${(props) => props.theme.lineHeight.font_base};
  }
`
