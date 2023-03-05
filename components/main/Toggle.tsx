import styled from 'styled-components'
import { TShowMode, TTimerMode } from '../../interface'

const ToggleSwitch = styled.label<{ open: boolean }>`
  width: 40px;
  height: 20px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: ${(props) => (props.open ? 'black' : 'white')};
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;

  transition: all 0.2s ease-in;
`
const ToggleButton = styled.span<{ open: boolean }>`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 50%;
  left: ${(props) =>
    props.open ? 'calc(100% - 18px)' : '2px'}; // 100% - width
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: ${(props) => (props.open ? 'white' : 'black')};

  transition: all 0.2s ease-in;
`
interface IToggle {
  open: TShowMode | TTimerMode
  setOpen: Function
}
const Toggle = ({ open, setOpen }: IToggle) => {
  return (
    <ToggleSwitch
      htmlFor="toggle"
      onClick={() => setOpen()}
      open={open === 'double' || open === 'normal'}
    >
      <ToggleButton open={open === 'double' || open === 'normal'} />
    </ToggleSwitch>
  )
}

export default Toggle
