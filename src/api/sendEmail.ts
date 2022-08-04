import { FieldValues } from 'react-hook-form';
import { API_URL } from '@constants';

const sendEmail = async (data: FieldValues) => {
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

    return result.ok;
  } catch (error) {
    throw new Error('Ошибка', error as Error);
  }
};

export default sendEmail;
