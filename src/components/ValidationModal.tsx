import React, { ReactNode } from "react";
import styled from "styled-components";

const ValidationModalStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 15rem;
  height: 1.5rem;
  border-radius: 1rem;
  outline: 0.1rem solid #15CE00;
  color: #15CE00;
  background-color: #fff;
  font-weight: 400;
  padding: 0.1rem 0 0.1rem 0.1rem;
  margin: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  font-size: 80%;

  img {
    width: 10%;
    height: 30%;
    padding: 0 0.1rem;
    filter: brightness(0) saturate(100%) invert(39%) sepia(92%) saturate(1152%) hue-rotate(82deg) brightness(116%) contrast(101%)
  }
`;

const CloseButton = styled.button`
   position: absolute;
    background-color: #fff;
    border: none;
    outline: none;
    color: #000;
    right: 0.7rem;
    top: 0.1rem;
    font-weight: 800;
    padding: 0;
    margin: 0;

    &:hover {
      color: #282726c3;
    }
`;

export interface ValidationMsgProps {
  children?: ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

export function ValidationModal({ children, onClick }: ValidationMsgProps) {
  return (
    <ValidationModalStyle>
      <img src="/checkmark.svg" alt="checkmark" />
      {children}
      <CloseButton type="button" onClick={onClick}>x</CloseButton>
    </ValidationModalStyle>
  );
}

// Series Added Success
// Series Added Fail
// Series Deleted Success
// Series Deleted Fail
// Series Modified Success
// Series Modified Fail