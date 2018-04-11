import request from './request';
import * as file from './file';
import { sleep } from './async';
import { generate as generateNumbers } from './numbers';

export const FILENAME = './content/levels.json';

export type Level = {
  id: number,
  name: string
};

export const getLevel = async (level, delay = 0): Promise<Level> => {
  try {
    await sleep(delay * 10);
    const response = await request(level);
    return {
      id: response.Nivel.Id,
      name: response.Nivel.Nome
    };
  } catch (error) {
    return null;
  }
};

export const getLevels = async (): Promise<Level[]> => {
  const requests = generateNumbers(0, 999).map(getLevel);
  const responses = await Promise.all(requests);
  const levels = [ ...responses ].filter((level) => !!level);
  return levels;
};

export const saveLevels = async () => {
  const levels = await getLevels();
  await file.save(FILENAME, levels);
};
