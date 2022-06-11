import React, { FC, RefObject, useState } from 'react';
import Icon from '@components/ui/Icon';
import './Dragger.scss';

interface DraggerProps {
  id: string;
  // setDraggable: (value: boolean) => void;
  itemRef: RefObject<HTMLDivElement>;
}

const Dragger: FC<DraggerProps> = ({ id, itemRef }) => {
  // const mouseDownHandler = () => {
  //   setDraggable(true);
  // };

  return (
    <div className="dragger">
      <Icon type="dragger" />
    </div>
  );
};

export default Dragger;
