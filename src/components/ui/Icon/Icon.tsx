import React, { FC, FunctionComponent, SVGProps } from 'react';
import cn from 'classnames';
import { ReactComponent as DraggerIcon } from '@assets/icons/dragger.svg';
import { ReactComponent as Plus } from '@assets/icons/plus.svg';

interface IconMapProps {
  [key: string]: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface IconProps {
  type: string;
  className?: string;
}

const iconMap: IconMapProps = {
  dragger: DraggerIcon,
  plus: Plus,
};

const Icon: FC<IconProps> = ({ type, className }) => {
  const Component = iconMap[type];
  return (
    <i className={cn('icon', className)}>
      <Component />
    </i>
  );
};

export default Icon;
