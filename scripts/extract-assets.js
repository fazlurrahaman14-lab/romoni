import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const resourceLogoPath = '/home/noname/Romoni-mart/resource/logo.jpg';
const publicDir = path.join(rootDir, 'public');
const assetsDir = path.join(publicDir, 'assets');
const productsDir = path.join(assetsDir, 'products');

[publicDir, assetsDir, productsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

if (fs.existsSync(resourceLogoPath)) {
  fs.copyFileSync(resourceLogoPath, path.join(assetsDir, 'logo.jpg'));
  console.log('Logo copied successfully to public/assets/logo.jpg');
}