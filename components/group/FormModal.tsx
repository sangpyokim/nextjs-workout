import React, { Ref } from 'react'
import styled from 'styled-components'
import { IFormModal } from '../../interface'
import FlatModal from '../main/FlatModal'

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  color: black;
  padding: 8px;
  & > * {
    margin-bottom: 8px;
  }
`
const TextArea = styled.textarea`
  min-height: 7rem;
`

const FormModal = ({
  open,
  setOpen,
  formRef,
  modalSubmitHandler,
}: IFormModal) => {
  return (
    <FlatModal
      header="그룹 만들기"
      open={open}
      setOpen={setOpen}
      onSubmit={modalSubmitHandler}
    >
      <ModalForm ref={formRef}>
        <label>
          그룹 명:{' '}
          <input
            placeholder="그룹명을 적어주세요."
            name={'title'}
            type={'text'}
          ></input>
        </label>

        <div>
          <label htmlFor="tag">카테고리: </label>
          <select
            name="tag"
            id="tag"
          >
            {[
              '대학생',
              '학생',
              '공부',
              '운동',
              '취미',
              '취업',
              '게임',
              '기타',
            ].map((str) => (
              <option
                key={str}
                value={str}
              >
                {str}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="capacity">모집 인원: </label>
          <select
            name="capacity"
            id="capacity"
          >
            {Array.from({ length: 29 }, (v, i) => i + 2).map((v) => (
              <option
                key={v}
                value={v}
              >
                {`${v}명`}
              </option>
            ))}
          </select>
        </div>

        <TextArea
          placeholder="어떤 그룹인지 설명해주세요."
          id="description"
          name="description"
          minLength={10}
        />
      </ModalForm>
    </FlatModal>
  )
}

export default FormModal
