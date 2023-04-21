import React from 'react'
import styled from 'styled-components'
import FlatModal from '../main/FlatModal'
import { useModal } from '../main/hooks/useModal'
import Modal from '../main/Modal'
import { useRegisterModal } from './hooks/useRegisterModal'

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
  color: var(--text-color);
  font-weight: 400;
  font-size: 14px;
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
  height: 14px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
  color: ${(props) => props.theme.colors.red};
`
interface IRegisterModal {
  open: boolean
  setOpen: Function
}

const RegisterModal = ({ open, setOpen }: IRegisterModal) => {
  const { nameRef, emailRef, passwordRef, summitRegister, authState } =
    useRegisterModal()

  return (
    <FlatModal
      header={'회원가입'}
      open={open}
      setOpen={setOpen}
    >
      <ModalContent>
        <LogInForm onSubmit={(e) => summitRegister(e)}>
          <FormItem>
            <Label htmlFor="password">이름</Label>
            <div>
              <Input
                autoFocus
                ref={nameRef}
                id="user-name"
                type="text"
                autoComplete=""
                name="name"
                pattern="^[가-힣a-zA-Z]{0, 5}+$" //
                placeholder="한글 5자 이내로 입력해주세요."
                required
              />
            </div>
          </FormItem>

          <FormItem>
            <Label htmlFor="user-id">아이디</Label>
            <div>
              <Input
                ref={emailRef}
                id="user-email"
                type="text"
                autoComplete=""
                name="userFormItem"
                pattern={'^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'} // 이메일
                placeholder="이메일 형식으로 입력해주세요."
                required
              />
            </div>
          </FormItem>

          <FormItem>
            <Label htmlFor="password">비밀번호</Label>
            <div>
              <Input
                ref={passwordRef}
                id="user-password"
                type="password"
                autoComplete=""
                name="user-password"
                pattern="^[a-z0-9_-]{6,18}$" // 단순 6~18자리
                placeholder="6 ~ 18자리로 입력해주세요."
                required
              />
            </div>
          </FormItem>

          <div>
            <SummitButton type="submit">회원가입</SummitButton>
          </div>
        </LogInForm>

        <ErrorContainer>{authState.length > 0 ? authState : ''}</ErrorContainer>
      </ModalContent>
    </FlatModal>
  )
}

export default RegisterModal
