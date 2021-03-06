import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import cn from 'classnames';
import Icon from '@components/ui/Icon';
import './Input.scss';

interface InputProps {
  type: string;
  ref?: RefObject<HTMLInputElement>;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  onMount?: 'select' | 'focus';
  getRef?: (ref: RefObject<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  className,
  onChange,
  onKeyDown,
  value,
  type,
  onMount,
  error,
  errorMessage,
  getRef,
  ...props
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (onMount === 'select') {
      ref?.current?.select();
    }

    if (onMount === 'focus') {
      ref?.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (ref && getRef) {
      getRef(ref);
    }
  }, [ref]);

  const Tooltip: FC = () => (
    <div className="ui-input__error-tooltip">{errorMessage}</div>
  );

  return (
    <div
      className={cn('ui-input', className, {
        error: error,
      })}
    >
      <input
        ref={ref}
        className={cn('ui-input__input')}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        type={type}
        {...props}
      />
      {error || errorMessage ? (
        <Icon type="exclamation" className="ui-input__error" />
      ) : null}
      {errorMessage ? <Tooltip /> : null}
    </div>
  );
};

export default Input;
