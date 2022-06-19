import React, { FC, FunctionComponent, MouseEvent, SVGProps } from 'react';
import cn from 'classnames';
import { ReactComponent as Cross } from '@assets/icons/cross.svg';
import { ReactComponent as DraggerIcon } from '@assets/icons/dragger.svg';
import { ReactComponent as Menu } from '@assets/icons/menu.svg';
import { ReactComponent as Plus } from '@assets/icons/plus.svg';
import './Icon.scss';

interface IconMapProps {
  [key: string]: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface IconProps {
  type: string;
  className?: string;
  clickHandler?: (e?: MouseEvent<HTMLElement>) => void;
}

const iconMap: IconMapProps = {
  dragger: DraggerIcon,
  plus: Plus,
  cross: Cross,
  menu: Menu,
};

const Icon: FC<IconProps> = ({ type, className, clickHandler }) => {
  const Component = iconMap[type];
  return (
    <i className={cn('icon', className)} onClick={clickHandler}>
      <Component />
    </i>
  );
};

export default Icon;
