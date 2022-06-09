import React, { FC } from 'react';
import cn from 'classnames';
import './Title.scss';

export interface TitleProps {
  children: JSX.Element | React.ReactNode;
  className?: string;
}

const Title: FC<TitleProps> = ({ children, className }) => {
  return <div className={cn('todo-title', className)}>{children}</div>;
};

export default Title;
