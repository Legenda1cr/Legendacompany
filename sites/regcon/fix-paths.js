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

  // Замена путей к CSS
  content = content.replace(/href="([^"]+\.css)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('../styles/')) return match;
    return `href="../styles/${p1.replace(/^.*[\\/]/, '')}"`;
  });

  // Замена путей к JS
  content = content.replace(/src="([^"]+\.js)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('../scripts/')) return match;
    return `src="../scripts/${p1.replace(/^.*[\\/]/, '')}"`;
  });

  // Замена путей к IMG, MP4
  content = content.replace(/src="\.\/([^"]+\.(png|jpg|jpeg|gif|mp4))"/g, (match, p1) => {
    return `src="../assets/${p1}"`;
  });

  // Замена url() в CSS
  content = content.replace(/url\(['"]?([^'")]+\.((png|jpg|jpeg|gif|mp4)))['"]?\)/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('../assets/')) return match;
    return `url('../assets/${p1.replace(/^.*[\\/]/, '')}')`;
  });

  // 🚩 Добавляем замену путей к HTML
  content = content.replace(/href="([^"]+\.html)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('pages/')) return match;
    return `href="pages/${p1}"`;
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
