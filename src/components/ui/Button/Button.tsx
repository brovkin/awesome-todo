import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import './Button.scss';

interface ButtonProps {
  className?: string;
  clickHandler?: () => void;
  children?: JSX.Element | React.ReactNode;
  mode?: 'button' | 'icon';
  icon?: JSX.Element | React.ReactNode;
  disabled?: boolean;
  tooltip?: string;
  type?: 'submit' | 'cancel';
}

const Button: FC<ButtonProps> = ({
  children,
  clickHandler,
  className,
  mode = 'button',
  type,
  icon,
  tooltip,
  disabled,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const isIcon = mode === 'icon';
  const isButton = mode === 'button';
  return (
    <button
      className={cn('ui-button', mode, className, {
        cancel: type === 'cancel',
        disabled,
      })}
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
