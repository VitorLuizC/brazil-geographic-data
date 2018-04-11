import * as fs from 'fs';
import { resolve } from 'path';
import { promisify, isString } from 'util';

export const write = promisify(fs.writeFile);

export const read = promisify(fs.readFile);

export const getFilename = (path) => resolve(__dirname, '../', path);

export const save = async (path: string, data: any) => {
  const string = await JSON.stringify(data, null, 2);
  const filename = getFilename(path);
  await write(filename, string);
};

export const load = async (path: string) => {
  const filename = getFilename(path);
  const data = await read(filename, 'utf8');
  return JSON.parse(data);
};
