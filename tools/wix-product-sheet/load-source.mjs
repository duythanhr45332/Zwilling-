import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

export function loadSource(inputPath) {
  if (inputPath?.endsWith('.json')) return JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const directory = inputPath || fileURLToPath(new URL('../backups/live-wix-2026-10-09-raw/', import.meta.url));
  return JSON.parse(execFileSync('python3', ['-c',
    "import csv,json,sys,pathlib; print(json.dumps({p.stem:list(csv.reader(p.open(encoding='utf-8-sig',newline=''))) for p in pathlib.Path(sys.argv[1]).glob('*.csv')}))",
    directory], {encoding: 'utf8', maxBuffer: 20 * 1024 * 1024}));
}
