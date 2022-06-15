import React, { FC } from 'react';
import cn from 'classnames';
import './Button.scss';

interface ButtonProps {
  className?: string;
  clickHandler?: () => void;
  children?: JSX.Element | React.ReactNode;
  type?: 'button' | 'icon';
  icon?: JSX.Element | React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  clickHandler,
  className,
  type = 'button',
  icon,
  ...props
}) => {
  const isIcon = type === 'icon';
  const isButton = type === 'button';
  return (
    <button
      className={cn('ui-button', className)}
      onClick={clickHandler}
      {...props}
    >
      {isButton && icon}
      {isIcon ? icon : children}
    </button>
  );
};

export default Button;
