import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const SideBar = ({ toggle, setToggle, user }: any) => {
  const router = useRouter()

  const isHere = (path?: string) => {
    if (!path && router.pathname === '/') return true
    return router.pathname.split('/').findIndex((ele) => ele === path) !== -1
  }

  return (
    <Container
      id="mySidenav"
      toggle={toggle}
    >
      <CloseButton
        onClick={() => {
          setToggle(false)
          isHere()
        }}
      >
        &times;
      </CloseButton>

      <Links isHere={() => isHere()}>
        <Link href="/">홈</Link>
      </Links>
      <Links isHere={() => isHere('statistics')}>
        <Link href={`/statistics/${user.email}`}>통계</Link>
      </Links>
      <Links isHere={() => isHere('group')}>
        <Link href={`/group/${user.email}`}>그룹</Link>
      </Links>
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
  background-color: var(--background-color);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;

  border-right: 1px solid;
  border-color: var(--border-color);
`

const Links = styled.div<{ isHere: () => boolean }>`
  padding: 4px 4px 4px 32px;
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSize.font_xl};
  line-height: ${(props) => props.theme.lineHeight.font_xl};

  color: ${(props) =>
    props.isHere() ? 'var(--text-color)' : 'var(--text-sub-color)'};
  display: block;
  transition: 0.3s;
  margin-bottom: 8px;

  &:hover {
    color: var(--text-color);
  }
`
const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;

  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 2.5rem;
  color: var(--text-color);
  display: block;
  transition: 0.3s;
  margin-bottom: 8px;
`
