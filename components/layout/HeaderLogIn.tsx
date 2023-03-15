import React from 'react'
import styled from 'styled-components'
import GoogleLogInButton from './GoogleLogInButton'
import FlatModal from '../main/FlatModal'
import useHeaderLogIn from './hooks/useHeaderLogIn'
import LogInDropDown from './LogInDropDown'
import RegisterModal from './RegisterModal'

interface IHeaderLogIn {
  open: boolean
  setOpen: Function
  user: string | null | undefined
  verifying: boolean
  signOut: () => void
  logIn: (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    password: string,
  ) => void
  authState: string
}

// 로그인 중, 로그인 안됨, 로그인 됨.
const HeaderLogIn = ({
  open,
  setOpen,
  user,
  verifying,
  signOut,
  logIn,
  authState,
}: IHeaderLogIn) => {
  const {
    rOpen,
    rSetOpen,
    dropDown,
    setDropDown,
    dropDownRef,
    idRef,
    passwordRef,
  } = useHeaderLogIn()

  if (verifying) return <Container open={false} />

  if (user)
    return (
      <Container open={true}>
        <Name
          ref={dropDownRef}
          onClick={() => setDropDown((prev) => !prev)}
        >
          {`${user}님`}
        </Name>

        <LogInDropDown
          signOut={signOut}
          dropDown={dropDown}
          setDropDown={setDropDown}
        />
      </Container>
    )

  return (
    <Container open={true}>
      <div onClick={() => setOpen(!open)}>로그인</div>

      <FlatModal
        header={'로그인'}
        open={open}
        setOpen={setOpen}
      >
        <ModalContent>
          <GoogleLogInButton />
          <LogInForm
            onSubmit={(e) =>
              logIn(e, idRef.current!.value, passwordRef.current!.value)
            }
          >
            <FormItem>
              <Label htmlFor="user-id">아이디</Label>
              <div>
                <Input
                  ref={idRef}
                  autoFocus
                  id="user-id"
                  type="text"
                  autoComplete=""
                  name="userFormItem"
                  pattern={'^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'} // 숫자 + 영문 만
                  required
                />
              </div>
            </FormItem>

            <FormItem>
              <Label htmlFor="password">비밀번호</Label>
              <div>
                <Input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  autoComplete=""
                  name="password"
                  pattern="^[a-z0-9_-]{6,18}$" // 단순 6~18자리
                  required
                />
              </div>
            </FormItem>
            <div>
              <SummitButton type="submit">로그인</SummitButton>
            </div>
          </LogInForm>

          <RegisterButton onClick={() => rSetOpen(true)}>
            회원가입
          </RegisterButton>

          <ErrorContainer>
            {authState.length > 0 ? authState : ''}
          </ErrorContainer>
        </ModalContent>
      </FlatModal>

      <RegisterModal
        open={rOpen}
        setOpen={rSetOpen}
      />
    </Container>
  )
}

export default HeaderLogIn

const Container = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;

  &:hover {
    cursor: ${(props) => (props.open ? 'pointer' : '')};
  }
`
const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;

  color: black;
`
const LogInForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
`
const FormItem = styled.div`
  margin-bottom: 12px;
`
const Label = styled.label`
  color: #252525;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSize.font_base};
  line-height: ${(props) => props.theme.lineHeight.font_base};
`
const Input = styled.input`
  padding: 8px 12px;
  width: 280px;

  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.4);

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`
const SummitButton = styled.button`
  padding: 8px 12px;
  width: 280px;
  background-color: ${(props) => props.theme.colors.blue};
  color: white;
  margin-bottom: 8px;
  font-weight: 500;

  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.4);

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`
const ErrorContainer = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_base};
  line-height: ${(props) => props.theme.lineHeight.font_base};

  font-weight: 500;
  margin-bottom: 2px;
  color: ${(props) => props.theme.colors.red};
`
const RegisterButton = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #41a0fa;
  margin-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
`
const Name = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_base};
  line-height: ${(props) => props.theme.lineHeight.font_base};
  font-weight: 600;
`
