import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  const prompt = process.argv[2];
  const out = process.argv[3];
  const size = process.argv[4] || '1440x736';
  const res = await zai.images.generations.create({ prompt, size });
  fs.writeFileSync(out, Buffer.from(res.data[0].base64, 'base64'));
  console.log('SAVED', out, fs.statSync(out).size, 'bytes');
}
main().catch(e => { console.error('ERR', e.message); process.exit(1); });
