import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import './Button.scss';

interface ButtonProps {
  className?: string;
  clickHandler?: () => void;
  children?: JSX.Element | React.ReactNode;
  type?: 'button' | 'icon';
  icon?: JSX.Element | React.ReactNode;
  tooltip?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  clickHandler,
  className,
  type = 'button',
  icon,
  tooltip,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const isIcon = type === 'icon';
  const isButton = type === 'button';
  return (
    <button
      className={cn('ui-button', type, className)}
      onClick={clickHandler}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...props}
    >
      {isButton && icon}
      {isIcon ? icon : children}
      {tooltip ? (
        <CSSTransition
          in={showTooltip}
          timeout={100}
          classNames="tooltip-animation"
        >
          <div className="ui-button__tooltip">{tooltip}</div>
        </CSSTransition>
      ) : null}
    </button>
  );
};

export default Button;
