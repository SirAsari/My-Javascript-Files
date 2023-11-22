// fs.rename(): Renames a file or directory.
// fs.unlink(): Deletes a file.
// fs.mkdir(): Creates a directory.
// fs.rmdir(): Removes a directory.

const fs = require('fs');

const oldFilePath = 'old_file.txt';
const newFilePath = 'new_file.txt';

fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
        console.error('Error renaming file:', err);
        return;
    }
    console.log('File renamed successfully!');
});
