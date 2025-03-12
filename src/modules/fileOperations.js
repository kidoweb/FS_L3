const fs = require('fs').promises; 
const fsSync = require('fs');       
const path = require('path');

const IGNORED_DIRS = ['node_modules', '.git', 'libs', 'modules'];

exports.writeFileSync = (filePath, data) => {
  try {
    fsSync.writeFileSync(filePath, data);
  } catch (err) {
    console.error('❌ Ошибка записи файла:', err);
  }
};

exports.readFileSync = (filePath) => {
  try {
    return fsSync.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.error('❌ Ошибка чтения файла:', err);
    return null;
  }
};

exports.updateFileSync = (filePath, newData) => {
  this.writeFileSync(filePath, newData);
};

exports.deleteFileContentSync = (filePath) => {
  this.writeFileSync(filePath, '');
};

exports.cleanFileSync = (filePath) => {
  try {
    let data = this.readFileSync(filePath);
    if (data) {
      data = data.replace(/[0-9]/g, '').toLowerCase();
      this.writeFileSync(filePath, data);
    }
  } catch (err) {
    console.error('❌ Ошибка очистки файла:', err);
  }
};

exports.copyFileSync = (srcPath, destPath) => {
  try {
    const data = this.readFileSync(srcPath);
    if (data !== null) {
      this.writeFileSync(destPath, data);
    }
  } catch (err) {
    console.error('❌ Ошибка копирования файла:', err);
  }
};

exports.createDirSync = (dirPath) => {
  try {
    if (!fsSync.existsSync(dirPath)) {
      fsSync.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
    console.error('❌ Ошибка создания папки:', err);
  }
};

exports.deleteDirSync = (dirPath) => {
  try {
    if (fsSync.existsSync(dirPath)) {
      fsSync.rmSync(dirPath, { recursive: true, force: true });
    }
  } catch (err) {
    console.error('❌ Ошибка удаления папки:', err);
  }
};

exports.listProjectFilesSync = (startPath) => {
  const results = [];
  const walk = (dir) => {
    const list = fsSync.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fsSync.statSync(fullPath);
      if (stat.isDirectory()) {
        if (!IGNORED_DIRS.includes(file)) walk(fullPath);
      } else {
        results.push(fullPath);
      }
    });
  };
  walk(startPath);
  return results;
};

exports.cleanProjectSync = (startPath) => {
  try {
    const files = this.listProjectFilesSync(startPath);
    files.forEach((file) => fsSync.unlinkSync(file));
    fsSync.readdirSync(startPath).forEach((file) => {
      const fullPath = path.join(startPath, file);
      if (fsSync.statSync(fullPath).isDirectory() && !IGNORED_DIRS.includes(file)) {
        this.deleteDirSync(fullPath);
      }
    });
  } catch (err) {
    console.error('❌ Ошибка очистки проекта:', err);
  }
};

exports.writeFileAsync = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
  } catch (err) {
    console.error('❌ Ошибка записи файла:', err);
  }
};

exports.readFileAsync = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    console.error('❌ Ошибка чтения файла:', err);
    return null;
  }
};

exports.updateFileAsync = async (filePath, newData) => {
  await this.writeFileAsync(filePath, newData);
};

exports.deleteFileContentAsync = async (filePath) => {
  await this.writeFileAsync(filePath, '');
};

exports.cleanFileAsync = async (filePath) => {
  try {
    let data = await this.readFileAsync(filePath);
    if (data) {
      data = data.replace(/[0-9]/g, '').toLowerCase();
      await this.writeFileAsync(filePath, data);
    }
  } catch (err) {
    console.error('❌ Ошибка очистки файла:', err);
  }
};

exports.copyFileAsync = async (srcPath, destPath) => {
  try {
    const data = await this.readFileAsync(srcPath);
    if (data !== null) {
      await this.writeFileAsync(destPath, data);
    }
  } catch (err) {
    console.error('❌ Ошибка копирования файла:', err);
  }
};

exports.createDirAsync = async (dirPath) => {
  try {
    if (!await fs.stat(dirPath).then(() => true).catch(() => false)) {
      await fs.mkdir(dirPath, { recursive: true });
    }
  } catch (err) {
    console.error('❌ Ошибка создания папки:', err);
  }
};

exports.deleteDirAsync = async (dirPath) => {
  try {
    if (await fs.stat(dirPath).then(() => true).catch(() => false)) {
      await fs.rm(dirPath, { recursive: true, force: true });
    }
  } catch (err) {
    console.error('❌ Ошибка удаления папки:', err);
  }
};

exports.listProjectFilesAsync = async (startPath) => {
  const results = [];
  const walk = async (dir) => {
    const list = await fs.readdir(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        if (!IGNORED_DIRS.includes(file)) await walk(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  };
  await walk(startPath);
  return results;
};

exports.cleanProjectAsync = async (startPath) => {
  try {
    const files = await this.listProjectFilesAsync(startPath);
    await Promise.all(files.map(file => fs.unlink(file)));
    const dirContent = await fs.readdir(startPath);
    await Promise.all(dirContent.map(async (file) => {
      const fullPath = path.join(startPath, file);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory() && !IGNORED_DIRS.includes(file)) {
        await this.deleteDirAsync(fullPath);
      }
    }));
  } catch (err) {
    console.error('❌ Ошибка очистки проекта:', err);
  }
};