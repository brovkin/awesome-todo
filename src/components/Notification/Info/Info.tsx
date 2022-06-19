import React, { FC } from 'react';

interface Info {
  text: JSX.Element | React.ReactNode | string;
}

const Info: FC<Info> = ({ text }) => {
  return <div className="info">{text}</div>;
};

export default Info;
