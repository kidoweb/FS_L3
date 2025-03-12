const fileOps = require('./modules/fileOperations');

console.log('--- Синхронные операции ---');
fileOps.writeFileSync('test.txt', 'Hello123 World!');
console.log('Содержимое файла:', fileOps.readFileSync('test.txt'));

fileOps.cleanFileSync('test.txt');
console.log('Очищенное содержимое:', fileOps.readFileSync('test.txt'));

fileOps.copyFileSync('test.txt', 'copy.txt');
console.log('Скопированный файл:', fileOps.readFileSync('copy.txt'));

fileOps.createDirSync('new_folder');
fileOps.deleteDirSync('new_folder');

console.log('Все файлы проекта:', fileOps.listProjectFilesSync(__dirname));

console.log('\n--- Асинхронные операции ---');
const asyncExample = async () => {
  await fileOps.writeFileAsync('async.txt', 'Async Test123');
  console.log('Асинхронное чтение:', await fileOps.readFileAsync('async.txt'));
  await fileOps.cleanFileAsync('async.txt');
  console.log('Очищенный файл:', await fileOps.readFileAsync('async.txt'));
  await fileOps.deleteDirAsync('async_folder');
};
asyncExample();