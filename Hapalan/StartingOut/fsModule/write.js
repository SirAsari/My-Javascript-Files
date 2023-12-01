const fs = require('fs');

// fs.readFile('storage.js', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     console.log('File content:', data);
// });

fs.writeFile('storage.js', 'New Text', 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('Write operation completed.');
})