const fs = require('fs');

// Data to append
const newData = `

// Appending a data
console.log('hello world');
`;

fs.appendFile('storage.js', newData, 'utf8', (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Data appended to file.');
});
