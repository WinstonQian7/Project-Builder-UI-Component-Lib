import { useState } from 'react';
import styled, { keyframes } from "styled-components";

const ButtonStyle = styled.button<{ variant: string }>`
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
  cursor: pointer;
  font-size: 100%;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
  height: 3rem;
  line-height: 1.15;
  margin: 0.75rem 0 0;
  overflow: hidden;
  padding: 0 1rem;
  position: relative;
  text-align: center;
  color: #fff;
  transition: all .2s, box-shadow .08s ease-in;
  width: 10rem;

  &:focus {
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'text':
        return `
          color: #405cf5;
          background-color: #fff; 
          box-shadow: none;

          &:focus {
            box-shadow: none;
          }
          `
    }
  }}
`;

const ripple = keyframes` 
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

interface RippleEffectProps {
  width: string;
  height: string;
  left: string;
  top: string;
}

const RippleEffect = styled.div<RippleEffectProps>`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  left: ${props => props.left};
  top: ${props => props.top};
  border-radius: 50%;
  transform: scale(0);
  animation: ${ripple} 600ms linear;
  background-color: rgba(133, 213, 252, 0.7);
`;

interface ButtonProps {
  backgroundColor?: string;
  variant?: "contained" | "text";
  children?: string;
  onClick: () => void
}

export function Button({
  backgroundColor, variant = "contained", children, onClick,
}: ButtonProps) {
  const [rippleOn, setRippleOn] = useState(false);
  const [rippleProp, setRippleProp] = useState({
    radius: 0, clientX: 0, clientY: 0, left: 0, top: 0,
  });
  const rippleEffect = (e: React.MouseEvent) => {
    setRippleOn(!rippleOn);
    const button = e.currentTarget;
    const radius = Math.max(button.clientWidth, button.clientHeight) / 2;

    setRippleProp({
      radius,
      clientX: e.clientX,
      clientY: e.clientY,
      left: button.getBoundingClientRect().left,
      top: button.getBoundingClientRect().top,
    });
  };

  const onClickHandler = (e: React.MouseEvent) => {
    onClick();
    rippleEffect(e);
  };

  return (
    <ButtonStyle type="button" onClick={onClickHandler} variant={variant}>
      {rippleOn &&
        <RippleEffect
          width={`${rippleProp.radius * 2}px`}
          height={`${rippleProp.radius * 2}px`}
          left={`${rippleProp.clientX - (rippleProp.left + rippleProp.radius)}px`}
          top={`${rippleProp.clientY - (rippleProp.top + rippleProp.radius)}px`}
        />
      }
      {children ?? "Click Me"}
    </ButtonStyle>
  );
}
