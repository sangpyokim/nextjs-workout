import styled from 'styled-components'
import { TShowMode, TTimerMode } from '../../interface'

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

const ToggleSwitch = styled.label<{ open: boolean }>`
  width: 40px;
  height: 20px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: ${(props) =>
    props.open ? 'var(--toggle-bg-on)' : 'var(--toggle-bg-off)'};

  border: 1px solid;
  border-color: var(--toggle-border-color);

  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;

  transition: all 0.2s ease-in;
`
const ToggleButton = styled.span<{ open: boolean }>`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 50%;
  left: ${(props) =>
    props.open ? 'calc(100% - 18px)' : '0px'}; // 100% - width
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: ${(props) =>
    props.open ? 'var(--toggle-on)' : 'var(--toggle-off)'};
  border: 1px solid;
  border-color: ${(props) => (props.open ? '' : 'var(--toggle-border-color)')};

  transition: all 0.2s ease-in;
`
