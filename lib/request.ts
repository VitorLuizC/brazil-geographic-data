import axios from 'axios';
import { URL, IBGEResponse } from './IBGE';

const request = async (level: number = 1): Promise<IBGEResponse> => {
  const response = await axios.get(URL, {
    data: {
      nivel: level
    }
  });

  return response.data as IBGEResponse;
};

export default request;
