import React, { FC, useEffect, useState } from 'react';
import useDebounce from '@hooks/useDebounce';
import './Tooltip.scss';

interface TooltipProps {
  children: JSX.Element | React.ReactNode;
  content: JSX.Element | string;
  condition?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ children, content, condition }) => {
  const [hover, setHover] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const debounce: boolean = useDebounce<boolean>(hover, 500);

  useEffect(() => {
    if (condition) {
      setShowContent(debounce);
    }
  }, [debounce]);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className="ui-tooltip"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {showContent ? (
        <div className="ui-tooltip__content">{content}</div>
      ) : null}
    </div>
  );
};

export default Tooltip;
