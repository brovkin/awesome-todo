import React, { FC, useEffect, useState } from 'react';
import Loader from '@components/ui/Loader';
import { getVersionInfo } from '@utils/api';
import './GithubBadge.scss';

const GithubBadge: FC = () => {
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    (async () => {
      const result = await getVersionInfo();
      const tagName = result?.tag_name;

      setVersion(tagName);
    })();
  }, []);

  return (
    <div className="github-badge">
      <Loader isLoading={!version}>
        <div className="github-badge__version">{version}</div>
      </Loader>
    </div>
  );
};

export default GithubBadge;
