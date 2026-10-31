#!/usr/bin/env node

const fs = require('node:fs');
const process = require('node:process');
const path = require('node:path');
const archiver = require('archiver');
const { program } = require('commander');

const ROOT = path.join(__dirname, '..');

const options = program
  .option('-f --firefox', 'Build for Firefox')
  .parse(process.argv)
  .opts();

const getPackageVersion = () => {
  const { version } = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'),
  );
  return `v${version}`;
};

const build = async (version) => {
  const mode = options.firefox ? 'firefox' : 'chrome';
  const zipName = `cookies.txt-o11_${version}_${mode}.zip`;
  fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
  const output = fs.createWriteStream(path.join(ROOT, 'dist', zipName));

  process.chdir(path.join(ROOT, 'src'));

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.pipe(output);
  archive.glob('**/*', { ignore: ['manifest*.json'] });
  archive.file(path.join(ROOT, 'LICENSE'), { name: 'LICENSE' });

  const manifest = JSON.parse(fs.readFileSync('manifest.json'));
  if (options.firefox) {
    const manifestFirefox = JSON.parse(
      fs.readFileSync('manifest-firefox.json'),
    );
    Object.assign(manifest, manifestFirefox);
  }
  archive.append(JSON.stringify(manifest, null, 2), { name: 'manifest.json' });

  archive.finalize();
  console.log('BUILD', zipName);
};

build(getPackageVersion());
