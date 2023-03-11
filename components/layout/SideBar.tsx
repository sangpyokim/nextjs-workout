import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const SideBar = ({ toggle, setToggle, user }: any) => {
  return (
    <Container
      id="mySidenav"
      toggle={toggle}
    >
      <CloseButton
        href="javascript:void(0)"
        onClick={() => setToggle(false)}
      >
        &times;
      </CloseButton>

      <Links href="/">홈</Links>
      <Links href={`/statistics/${user.email}`}>통계</Links>
      <Links href={`/group/${user.email}`}>그룹</Links>
    </Container>
  )
}

export default SideBar

const Container = styled.div<{ toggle: boolean }>`
  width: ${(props) => (props.toggle ? '250px' : '0px')};

  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: black;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;

  border-right: 1px solid white;
`
const Links = styled(Link)`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 2.5rem;
  color: #818181;
  display: block;
  transition: 0.3s;
  margin-bottom: 8px;

  &:hover {
    color: #fff;
  }
`
const CloseButton = styled(Link)`
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
`
