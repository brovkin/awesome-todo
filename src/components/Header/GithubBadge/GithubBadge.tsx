import React, { FC } from 'react';
import Loader from '@components/ui/Loader';
import { useGetGithubInfoQuery } from '@features/api';
import './GithubBadge.scss';

const GithubBadge: FC = () => {
  const { data, isLoading } = useGetGithubInfoQuery('/releases/latest');

  const version = data?.tag_name;

  return (
    <div className="github-badge">
      <Loader isLoading={isLoading}>
        <div className="github-badge__version">{version}</div>
      </Loader>
    </div>
  );
};

export default GithubBadge;
