import { GITHUB_API_URL } from '@constants';

export const getVersionInfo = async () => {
  const response = await fetch(`${GITHUB_API_URL}/releases/latest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};
