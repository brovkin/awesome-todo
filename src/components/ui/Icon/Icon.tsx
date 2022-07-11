import React, { FC, FunctionComponent, MouseEvent, SVGProps } from 'react';
import cn from 'classnames';
import { ReactComponent as Adjust } from '@assets/icons/adjust.svg';
import { ReactComponent as Broom } from '@assets/icons/broom.svg';
import { ReactComponent as Cross } from '@assets/icons/cross.svg';
import { ReactComponent as Cup } from '@assets/icons/cup.svg';
import { ReactComponent as Delete } from '@assets/icons/delete.svg';
import { ReactComponent as DraggerIcon } from '@assets/icons/dragger.svg';
import { ReactComponent as Edit } from '@assets/icons/edit.svg';
import { ReactComponent as Exclamation } from '@assets/icons/exclamation.svg';
import { ReactComponent as Menu } from '@assets/icons/menu.svg';
import { ReactComponent as Plus } from '@assets/icons/plus.svg';
import { ReactComponent as Profile } from '@assets/icons/profile.svg';
import { ReactComponent as Settings } from '@assets/icons/settings.svg';
import { ReactComponent as Spinner } from '@assets/icons/spinner.svg';
import './Icon.scss';

interface IconMapProps {
  [key: string]: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface IconProps {
  type: string;
  className?: string;
  clickHandler?: (e: MouseEvent<HTMLElement>) => void;
}

const iconMap: IconMapProps = {
  dragger: DraggerIcon,
  plus: Plus,
  cross: Cross,
  menu: Menu,
  settings: Settings,
  adjust: Adjust,
  exclamation: Exclamation,
  profile: Profile,
  broom: Broom,
  edit: Edit,
  spinner: Spinner,
  delete: Delete,
  cup: Cup,
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
