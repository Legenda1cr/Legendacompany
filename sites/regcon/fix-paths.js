const fs = require('fs');
const path = require('path');

// Папка, где лежит src
const baseDir = path.join(__dirname, 'src');

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.html', '.css', '.js'].includes(ext)) return;

  const backupPath = filePath + '.bak';
  fs.copyFileSync(filePath, backupPath);

  let content = fs.readFileSync(filePath, 'utf8');

  // Типовые замены путей
  content = content.replace(/href="([^"]+\.css)"/g, (match, p1) => {
    if (p1.startsWith('http')) return match;
    return `href="../styles/${p1.replace(/^.*[\\/]/, '')}"`;
  });

  content = content.replace(/src="([^"]+\.js)"/g, (match, p1) => {
    if (p1.startsWith('http')) return match;
    return `src="../scripts/${p1.replace(/^.*[\\/]/, '')}"`;
  });

  content = content.replace(/src="\.\/([^"]+\.(png|jpg|jpeg|gif|mp4))"/g, (match, p1) => {
    return `src="../assets/${p1}"`;
  });

  content = content.replace(/url\(['"]?([^'")]+\.((png|jpg|jpeg|gif|mp4)))['"]?\)/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('../assets/')) return match;
    return `url('../assets/${p1.replace(/^.*[\\/]/, '')}')`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Обработан: ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else {
      processFile(fullPath);
    }
  });
}

walk(baseDir);
console.log('🎉 Все пути обновлены. Резервные файлы с расширением .bak сохранены.');

