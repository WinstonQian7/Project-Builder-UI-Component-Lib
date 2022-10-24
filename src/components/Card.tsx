import { ReactElement, ReactNode } from 'react';
import styled from "styled-components";

const CardStyling = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 10rem;
  height: 10rem;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
  
  .header {
    flex: 2 0;
  }

  .content {
    flex: 3 0;
  }

  .actions {
    position: relative;
  }
`;

// content could be images in future ...
interface CardProps {
  header: ReactElement | string;
  content: ReactNode;
  actions: ReactElement;
}

export function Card({ header, content, actions }: CardProps) {
  return (
    <CardStyling>
      <div className="header">{header}</div>
      <div className="content">{content}</div>
      <div className="actions">{actions}</div>
    </CardStyling>
  );
}
