import axios from 'axios';

const URL = 'https://sidra.ibge.gov.br/Territorio/Unidades';

const request = async (level: number = 1) => {
  const response = await axios.get(URL, {
    data: {
      nivel: level
    }
  });

  console.log(response.data);
};

export default request;
