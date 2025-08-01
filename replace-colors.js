const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function replaceInFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  let newContent = content
    .replace(/bg-nepal-orange/g, 'bg-tmtn-red')
    .replace(/text-nepal-orange/g, 'text-tmtn-red')
    .replace(/border-nepal-orange/g, 'border-tmtn-red')
    .replace(/ring-nepal-orange/g, 'ring-tmtn-red')
    .replace(/hover:bg-nepal-orange/g, 'hover:bg-tmtn-red')
    .replace(/hover:text-nepal-orange/g, 'hover:text-tmtn-red')
    .replace(/bg-nepal-primary/g, 'bg-tmtn-blue')
    .replace(/text-nepal-primary/g, 'text-tmtn-blue')
    .replace(/border-nepal-primary/g, 'border-tmtn-blue')
    .replace(/ring-nepal-primary/g, 'ring-tmtn-blue')
    .replace(/hover:bg-nepal-primary/g, 'hover:bg-tmtn-blue')
    .replace(/hover:text-nepal-primary/g, 'hover:text-tmtn-blue')
    .replace(/hover:bg-orange-600/g, 'hover:bg-tmtn-red/90');
  
  if (content !== newContent) {
    await writeFile(filePath, newContent);
    console.log('Updated:', filePath);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      await replaceInFile(fullPath);
    }
  }
}

processDirectory('src').catch(console.error);
