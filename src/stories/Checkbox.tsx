import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const CheckboxStyle = styled.label`
  display: flex;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;  

  .checkboxBg {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 2.5rem;
    height: 2.5rem;
    z-index: -1;
    background-color: #000;
    border-radius: 1rem;
  }

  input {
    position: absolute;
    clip-path: inset(50%); 
    height: 1px; 
    width: 1px;
    margin: -1px;
  }

  input:checked ~ .checkbox {
    background-color: #fff;
    border-color: #6F4B93;
  }

  input:checked ~ .checkbox::after {
    display: block;
  }

  .checkbox {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border: 0.15rem solid #fff;
    border-radius: 0.2rem;
    pointer-events: auto;
  }

  .checkbox::after, .checkbox::before {
    content: "";
  }

  .checkbox::after {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-image: url("/checkmark.svg");
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
  }

  /* &:hover input:checked ~ .checkbox::after {
    outline: 0.5rem solid rgba(235, 232, 232, 0.15);
    border-radius: 50%;
  } */

  input:indeterminate ~ .checkbox::before {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.1rem solid; 
    background-color: #fff;
    margin-top: 40%;
    margin-left: 25%;
    box-sizing: border-box;
    width: 50%;
    height: 10%;
  }

  input:indeterminate ~ .checkbox {
    background-color: #6F4B93;
  }
`;

interface CheckboxProps {
  ariaLabel?: string
  checked?: boolean;
  isIndeterminate?: boolean;
  disabled?: boolean;
  label?: string
  onChange?: (e: React.ChangeEvent) => void;
  onClick?: (e: React.MouseEvent) => void; 
}

export function Checkbox({ ariaLabel, checked, isIndeterminate, label, onChange, onClick }: CheckboxProps) {
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    checkboxRef.current.indeterminate = isIndeterminate ?? false;
  }, [isIndeterminate])
  
  return (
    <CheckboxStyle>
      {/* <div className="checkboxBg"></div> */}
        {label}
        <input 
          type="checkbox" 
          onChange={onChange} 
          onClick={onClick} 
          checked={checked} 
          ref={checkboxRef}
          aria-label={ariaLabel ?? "custom"}
        />
        <span
          aria-hidden="true"
          className="checkbox"
        >
      </span>
    </CheckboxStyle>
  );
}

