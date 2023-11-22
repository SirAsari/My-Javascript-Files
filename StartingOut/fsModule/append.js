const fs = require('fs');

fs.appendFile('storage.js', 'New data to append', 'utf8', (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Data appended to file.');
});