import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import './Title.scss';

export interface TitleProps {
  children: JSX.Element | React.ReactNode;
  checked: boolean;
}

const Title: FC<TitleProps> = ({ children, checked }) => {
  return (
    <CSSTransition in={checked} timeout={100} classNames="title-shift">
      <div
        className={cn('todo-title', {
          crossout: checked,
        })}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

export default Title;
