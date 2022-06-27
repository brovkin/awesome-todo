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
  error?: string;
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

  return (
    <div className={cn('ui-input', className)}>
      <input
        ref={ref}
        className={cn('ui-input__input', {
          error: error,
        })}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        type={type}
        {...props}
      />
      {error ? (
        <Icon type="exclamation" className="ui-input__error" tooltip={error} />
      ) : null}
    </div>
  );
};

export default Input;
