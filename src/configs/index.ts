import { registerAs } from '@nestjs/config';
import { readdirSync } from 'fs';

export function load(): ReturnType<typeof registerAs>[] {
  return readdirSync(__dirname)
    .filter((file) => !file.includes('index.js'))
    .map((file) =>
      registerAs(
        file.replace('.js', '').toUpperCase(),
        () => import(`./${file}`),
      ),
    );
}
