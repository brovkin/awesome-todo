import React, { FC } from 'react';
import cn from 'classnames';
import './Button.scss';

interface ButtonProps {
  className: string;
  clickHandler: () => void;
  children: JSX.Element | React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, clickHandler, className }) => {
  return (
    <button className={cn('ui-button', className)} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
