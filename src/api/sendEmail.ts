import { API_URL } from '@constants';

const sendEmail = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return new Error(response.statusText);
    }

    const result = await response.json();
  } catch (error) {
    throw new Error('Ошибка', error as Error);
  }
};

export default sendEmail;
